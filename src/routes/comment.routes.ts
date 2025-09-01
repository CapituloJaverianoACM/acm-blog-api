import { Elysia } from 'elysia';
import { CommentService } from '../services/comment.services';
import { CreateCommentSchema, UpdateCommentSchema, CommentParamsSchema } from '../schemas/comment.schemas';
import { ResponseHelpers } from '../utils/response.helpers';

export const commentRoutes = new Elysia({ prefix: '/comments' })

  // GET /comments - Get all comments
  .get('/', async () => {
    try {
      const comments = await CommentService.getAllComments();
      return ResponseHelpers.ok(
        comments, 
        "Comments retrieved successfully", 
        comments.length
      );
    } catch (error) {
      return ResponseHelpers.serverError("Failed to retrieve comments");
    }
  })

  // GET /comments/:id - Get a specific comment
  .get('/:id', async ({ params: { id } }) => {
    try {
      const commentId = parseInt(id);
      const comment = await CommentService.getCommentById(commentId);

      if (!comment) {
        return ResponseHelpers.notFound('Comment not found');
      }

      return ResponseHelpers.ok(comment, "Comment retrieved successfully");
    } catch (error) {
      return ResponseHelpers.serverError("Failed to retrieve comment");
    }
  }, {
    params: CommentParamsSchema
  })

  // GET /comments/blog/:blog_id - Get comments for a specific blog
  .get('/blog/:blog_id', async ({ params: { blog_id } }) => {
    try {
      const blogId = parseInt(blog_id);
      const comments = await CommentService.getCommentsByBlogId(blogId);

      return ResponseHelpers.ok(
        comments, 
        `Comments for blog ${blogId} retrieved successfully`, 
        comments.length
      );
    } catch (error) {
      return ResponseHelpers.serverError("Failed to retrieve blog comments");
    }
  })

  // GET /comments/:id/replies - Get replies to a specific comment
  .get('/:id/replies', async ({ params: { id } }) => {
    try {
      const commentId = parseInt(id);
      const replies = await CommentService.getRepliesByCommentId(commentId);

      return ResponseHelpers.ok(
        replies, 
        `Replies to comment ${commentId} retrieved successfully`, 
        replies.length
      );
    } catch (error) {
      return ResponseHelpers.serverError("Failed to retrieve comment replies");
    }
  }, {
    params: CommentParamsSchema
  })

  // POST /comments - Create a new comment
  .post('/', async ({ body }) => {
    try {
      const newComment = await CommentService.createComment(body);
      return ResponseHelpers.created(newComment, "Comment created successfully");
    } catch (error) {
      return ResponseHelpers.serverError("Failed to create comment");
    }
  }, {
    body: CreateCommentSchema
  })

  // PUT /comments/:id - Update a comment
  .put('/:id', async ({ params: { id }, body }) => {
    try {
      const commentId = parseInt(id);
      const updatedComment = await CommentService.updateComment(commentId, body);

      if (!updatedComment) {
        return ResponseHelpers.notFound('Comment not found');
      }

      return ResponseHelpers.ok(updatedComment, "Comment updated successfully");
    } catch (error) {
      return ResponseHelpers.serverError("Failed to update comment");
    }
  }, {
    params: CommentParamsSchema,
    body: UpdateCommentSchema
  })

  // DELETE /comments/:id - Delete a comment
  .delete('/:id', async ({ params: { id } }) => {
    try {
      const commentId = parseInt(id);
      const deletedComment = await CommentService.deleteComment(commentId);

      if (!deletedComment) {
        return ResponseHelpers.notFound('Comment not found');
      }

      return ResponseHelpers.ok(deletedComment, "Comment deleted successfully");
    } catch (error) {
      return ResponseHelpers.serverError("Failed to delete comment");
    }
  }, {
    params: CommentParamsSchema
  });