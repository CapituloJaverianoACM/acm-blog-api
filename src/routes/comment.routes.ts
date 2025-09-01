import { Elysia } from 'elysia';
import { CommentService } from '../services/comment.services';
import { CreateCommentSchema, UpdateCommentSchema, CommentParamsSchema } from '../schemas/comment.schemas';
import { ResponseHelpers } from '../utils/response.helpers';


export const commentRoutes = new Elysia({ prefix: '/comments' })

  // GET /comments - Get all comments
  .get('/', () => {
    const comments = CommentService.getAllComments();
    return ResponseHelpers.ok(
      comments, 
      "Comments retrieved successfully", 
      comments.length
    );
  })

  // GET /comments/:id - Get a specific comment
  .get('/:id', ({ params: { id } }) => {
    const commentId = parseInt(id);
    const comment = CommentService.getCommentById(commentId);

    if (!comment) {
      return ResponseHelpers.notFound('Comment not found');
    }

    return ResponseHelpers.ok(comment, "Comment retrieved successfully");
  }, {
    params: CommentParamsSchema
  })

  // GET /comments/blog/:blog_id - Get comments for a specific blog
  .get('/blog/:blog_id', ({ params: { blog_id } }) => {
    const blogId = parseInt(blog_id);
    const comments = CommentService.getCommentsByBlogId(blogId);

    return ResponseHelpers.ok(
      comments, 
      `Comments for blog ${blogId} retrieved successfully`, 
      comments.length
    );
  })

  // GET /comments/:id/replies - Get replies to a specific comment
  .get('/:id/replies', ({ params: { id } }) => {
    const commentId = parseInt(id);
    const replies = CommentService.getRepliesByCommentId(commentId);

    return ResponseHelpers.ok(
      replies, 
      `Replies to comment ${commentId} retrieved successfully`, 
      replies.length
    );
  }, {
    params: CommentParamsSchema
  })

  // POST /comments - Create a new comment
  .post('/', ({ body }) => {
    const newComment = CommentService.createComment(body);
    return ResponseHelpers.created(newComment, "Comment created successfully");
  }, {
    body: CreateCommentSchema
  })

  // PUT /comments/:id - Update a comment
  .put('/:id', ({ params: { id }, body }) => {
    const commentId = parseInt(id);
    const updatedComment = CommentService.updateComment(commentId, body);

    if (!updatedComment) {
      return ResponseHelpers.notFound('Comment not found');
    }

    return ResponseHelpers.ok(updatedComment, "Comment updated successfully");
  }, {
    params: CommentParamsSchema,
    body: UpdateCommentSchema
  })

  // DELETE /comments/:id - Delete a comment
  .delete('/:id', ({ params: { id } }) => {
    const commentId = parseInt(id);
    const deletedComment = CommentService.deleteComment(commentId);

    if (!deletedComment) {
      return ResponseHelpers.notFound('Comment not found');
    }

    return ResponseHelpers.ok(deletedComment, "Comment deleted successfully");
  }, {
    params: CommentParamsSchema
  });