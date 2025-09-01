import { PrismaClient } from '@prisma/client';
import type { Comment, CreateCommentRequest, UpdateCommentRequest } from '../types/comment';

// Initialize Prisma client
const prisma = new PrismaClient();

export class CommentService {

  // Get all comments
  static async getAllComments(): Promise<Comment[]> {
    const comments = await prisma.comment.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });
    return comments as Comment[];
  }

  // Get a single comment by ID
  static async getCommentById(id: number): Promise<Comment | null> {
    const comment = await prisma.comment.findUnique({
      where: { id }
    });
    return comment as Comment | null;
  }

  // Get all comments for a specific blog
  static async getCommentsByBlogId(blogId: number): Promise<Comment[]> {
    const comments = await prisma.comment.findMany({
      where: { blog_id: blogId },
      orderBy: {
        created_at: 'desc'
      }
    });
    return comments as Comment[];
  }

  // Get all replies to a specific comment
  static async getRepliesByCommentId(commentId: number): Promise<Comment[]> {
    const replies = await prisma.comment.findMany({
      where: { parent_id: commentId },
      orderBy: {
        created_at: 'asc'
      }
    });
    return replies as Comment[];
  }

  // Create a new comment
  static async createComment(data: CreateCommentRequest): Promise<Comment> {
    const now = new Date();
    
    const newComment = await prisma.comment.create({
      data: {
        id: await CommentService.getNextId(), // Generate ID manually
        blog_id: data.blog_id,
        parent_id: data.parent_id || null,
        content: data.content,
        owner_id: data.owner_id,
        created_at: now,
        last_update: now
      }
    });
    
    return newComment as Comment;
  }

  // Update an existing comment
  static async updateComment(id: number, data: UpdateCommentRequest): Promise<Comment | null> {
    try {
      const updatedComment = await prisma.comment.update({
        where: { id },
        data: {
          ...(data.content !== undefined && { content: data.content }),
          last_update: new Date()
        }
      });
      
      return updatedComment as Comment;
    } catch (error) {
      // Comment not found
      return null;
    }
  }

  // Delete a comment
  static async deleteComment(id: number): Promise<Comment | null> {
    try {
      const deletedComment = await prisma.comment.delete({
        where: { id }
      });
      
      return deletedComment as Comment;
    } catch (error) {
      // Comment not found
      return null;
    }
  }

  // Helper method to get next available ID
  private static async getNextId(): Promise<number> {
    const lastComment = await prisma.comment.findFirst({
      orderBy: { id: 'desc' }
    });
    return (lastComment?.id || 0) + 1;
  }

  // Cleanup method to disconnect from database
  static async disconnect(): Promise<void> {
    await prisma.$disconnect();
  }
}