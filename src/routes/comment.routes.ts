import { Elysia } from 'elysia';
import { CommentService } from '../services/comment.services';
import { CreateCommentSchema, UpdateCommentSchema, CommentParamsSchema } from '../schemas/comment.schemas';
import type { ApiResponse } from '../types/api';
import type { Comment } from '../types/comment';

export const commentRoutes = new Elysia({prefix: '/comments'})
// HTTP method: GET - /comments - Get all comments
.get('/', () => {
    const comments = CommentService.getAllComments();

    const response: ApiResponse<Comment[]> = {
        success: true,
        data: comments,
        count: comments.length
    };

    return response;
})

// HTTP method: GET - /comments/:id - Get a specific comment
.get('/:id', ({params: {id}}) => {
    const commentId = parseInt(id);
    const comment = CommentService.getCommentById(commentId);

    // If there is no comment given that ID
    if(!comment){
        const response: ApiResponse<null> = {
            success: false,
            error: "Comment not found"
        };
        return response;
    }

    //If theres a comment given that ID
    const response: ApiResponse<Comment> ={
        success: true,
        data: comment
    };

    return response;
}, {
    params: CommentParamsSchema
})

// HTTP Method: GET - /comments/blog/:blog_id - Get all comments for a specific blog
.get('/blog/:blog_id', ({params: {blog_id}}) => {
    const blogId = parseInt(blog_id);
    const comments = CommentService.getCommentsByBlogId(blogId);

    const response: ApiResponse<Comment[]> = {
        success: true,
        data: comments,
        count: comments.length
    }

    return response;
})

// HTTP Method: GET - /comments/:id/replies - Get replies to a specific comment
.get('/:id/replies', ({params: {id}}) =>{
    const commentId = parseInt(id);
    const replies = CommentService.getRepliesByCommentId(commentId);

    const response: ApiResponse<Comment[]> = {
        success: true,
        data: replies,
        count: replies.length
    };

    return response;
},{
    params: CommentParamsSchema
})

// HTTP Method: POST - /comments - Create a new comment
.post('/', ({body}) =>{
    const newComment = CommentService.createComment(body);

    const response: ApiResponse<Comment> = {
        success: true,
        data:newComment,
        message: 'Comment created successfully'
    };
    return response;
},{
    body : CreateCommentSchema
})

// HTTP Method: PUT - /comments/:id - Update an existing comment
.put('/:id', ({ params: { id }, body }) => {
    const commentId = parseInt(id);
    const updatedComment = CommentService.updateComment(commentId, body);
    
    if (!updatedComment) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Comment not found'
      };
      return response;
    }
    
    const response: ApiResponse<Comment> = {
      success: true,
      data: updatedComment,
      message: 'Comment updated successfully'
    };
    
    return response;
  }, {
    params: CommentParamsSchema,
    body: UpdateCommentSchema
})

// HTTP Method: DELETE - /comments/:id - Delete a specific comment
.delete('/:id', ({params: {id}}) =>{
    const commentId = parseInt(id);
    const deletedComment = CommentService.deleteComment(commentId);

    if (!deletedComment){
        const response: ApiResponse<null> = {
            success: false,
            error: 'Comment not found'
        };
        return response;
    }

    const response: ApiResponse<Comment> = {
        success: true,
        data: deletedComment,
        message: 'Comment deleted successfully'
    };

    return response;
},{
    params: CommentParamsSchema
});