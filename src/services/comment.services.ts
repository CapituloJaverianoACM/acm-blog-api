import type { Comment, CreateCommentRequest, UpdateCommentRequest } from '../types/comment';
import type { ICommentRepository } from '../repositories/comment.repository.interface';
import { PrismaCommentRepository } from '../repositories/prisma-comment.repository';

export class CommentService {
  private static repository: ICommentRepository = new PrismaCommentRepository();

  // Get all comments
  static async getAllComments(): Promise<Comment[]> {
    return await CommentService.repository.getAllComments();
  }

  // Get a single comment by ID
  static async getCommentById(id: number): Promise<Comment | null> {
    return await CommentService.repository.getCommentById(id);
  }

  // Get all comments for a specific blog
  static async getCommentsByBlogId(blogId: number): Promise<Comment[]> {
    return await CommentService.repository.getCommentsByBlogId(blogId);
  }

  // Get all replies to a specific comment
  static async getRepliesByCommentId(commentId: number): Promise<Comment[]> {
    return await CommentService.repository.getRepliesByCommentId(commentId);
  }

  // Create a new comment
  static async createComment(data: CreateCommentRequest): Promise<Comment> {
    return await CommentService.repository.createComment(data);
  }

  // Update an existing comment
  static async updateComment(id: number, data: UpdateCommentRequest): Promise<Comment | null> {
    return await CommentService.repository.updateComment(id, data);
  }

  // Delete a comment
  static async deleteComment(id: number): Promise<Comment | null> {
    return await CommentService.repository.deleteComment(id);
  }

  // Cleanup method to disconnect from database
  static async disconnect(): Promise<void> {
    return await CommentService.repository.disconnect();
  }

  // Method to inject different repository (for testing)
  static setRepository(repository: ICommentRepository): void {
    CommentService.repository = repository;
  }
}