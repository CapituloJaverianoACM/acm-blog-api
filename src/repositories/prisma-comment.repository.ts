import { PrismaClient } from '@prisma/client';
import type { Comment, CreateCommentRequest, UpdateCommentRequest } from '../types/comment';
import type { ICommentRepository } from './comment.repository.interface';

export class PrismaCommentRepository implements ICommentRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  // Get all comments
  async getAllComments(): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany({
      orderBy: { created_at: 'desc' }
    });
    return comments as Comment[];
  }

  // Get a single comment
  async getCommentById(id: number): Promise<Comment | null> {
    const comment = await this.prisma.comment.findUnique({
      where: { id }
    });
    return comment as Comment | null;
  }

  // Get all comments for a blog
  async getCommentsByBlogId(blogId: number): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany({
      where: { blog_id: blogId },
      orderBy: { created_at: 'desc' }
    });
    return comments as Comment[];
  }

  // All the replies from a comment
  async getRepliesByCommentId(commentId: number): Promise<Comment[]> {
    const replies = await this.prisma.comment.findMany({
      where: { parent_id: commentId },
      orderBy: { created_at: 'asc' }
    });
    return replies as Comment[];
  }

  // Create a new comment on a post
  async createComment(data: CreateCommentRequest): Promise<Comment> {
    const now = new Date();
    const newComment = await this.prisma.comment.create({
      data: {
        id: await this.getNextId(),
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
  async updateComment(id: number, data: UpdateCommentRequest): Promise<Comment | null> {
    try {
      const updatedComment = await this.prisma.comment.update({
        where: { id },
        data: {
          content: data.content, 
          last_update: new Date()
        }
      });
      return updatedComment as Comment;
    } catch (error) {
      return null;
    }
  }
  // Delete a comment from a post
  async deleteComment(id: number): Promise<Comment | null> {
    try {
      const deletedComment = await this.prisma.comment.delete({
        where: { id }
      });
      return deletedComment as Comment;
    } catch (error) {
      return null;
    }
  }
  // ID from the comment
  async getNextId(): Promise<number> {
    const lastComment = await this.prisma.comment.findFirst({
      orderBy: { id: 'desc' }
    });
    return (lastComment?.id || 0) + 1;
  }
  //End connection 
  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}