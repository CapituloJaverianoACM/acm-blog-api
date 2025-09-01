import type {Comment, CreateCommentRequest, UpdateCommentRequest} from '../types/comment';

export interface ICommentRepository{
    getAllComments(): Promise<Comment[]>;
    getCommentById(id: number): Promise<Comment | null>;
    getCommentsByBlogId(blogId: number): Promise<Comment[]>;
    getRepliesByCommentId(commentId: number): Promise<Comment[]>;
    createComment(data: CreateCommentRequest): Promise<Comment>;
    updateComment(id: number, data: UpdateCommentRequest): Promise<Comment | null>;
    deleteComment(id: number): Promise<Comment | null>;
    getNextId(): Promise<number>;
    disconnect(): Promise<void>;
}