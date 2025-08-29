import {Comment, CreateCommentRequest, UpdateCommentRequest } from '../types/comment';

// In-memory storage, while we setup databse with Supabase, PostgreSQL or ...
let comments: Comment[] = [];
let nextId = 1;


const generateId = (): number => nextId++;

export class CommentService{

    //Get all comments
    static getAllComments(): Comment[]{
        return comments;
    }

    //Get a single coment by ID
    static getCommentById(id: number): Comment | null {
        return comments.find(comment => comment.id === id) || null;
    }

    //Get all comments for a specific blog
    static getCommentsByBlogId(blogId: number): Comment[] {
        return comments.filter(comment => comment.blog_id === blogId);
    }


    //Get all replies to a specific comment
    static getRepliesByCommentId(commentId: number): Comment[] {
        return comments.filter(comment => comment.parent_id === commentId);
    }

    // Constructor - Create a new comment
    static createComment(data: CreateCommentRequest): Comment {
        const now = new Date();
        const newComment: Comment = {
          id: generateId(),
          blog_id: data.blog_id,
          parent_id: data.parent_id || null,
          content: data.content,
          owner_id: data.owner_id,
          created_at: now,
          last_update: now
        };
    
        comments.push(newComment);
        return newComment;
    }

    // Update an existing comment
    static updateComment(id: number, data: UpdateCommentRequest): Comment | null {
        const commentIndex = comments.findIndex(comment => comment.id === id);
        const updateTime = new Date();

        if(data.content !== undefined){
            comments[commentIndex].content = data.content;
            comments[commentIndex].last_update = updateTime;
        }
        
        return comments[commentIndex];
    }

    // Delete a comment

    static deleteComment(id: number): Comment | null {
        const commentIndex = comments.findIndex(comment => comment.id === id);
        
        const deletedComment = comments.splice(commentIndex, 1)[0];
        return deletedComment;
    }

}