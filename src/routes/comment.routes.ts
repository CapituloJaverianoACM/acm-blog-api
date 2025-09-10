import { Elysia } from 'elysia';
import { CreateCommentSchema, UpdateCommentSchema, CommentParamsSchema } from '../schemas/comment.schemas';
import { ResponseHelpers } from '../utils/response.helpers';
import { SupabaseAdaapter } from '../repositories/supabase.adapter';

const TABLE = 'comment';
const db: SupabaseAdaapter = SupabaseAdaapter.getInstance();

export const commentRoutes = new Elysia({ prefix: '/comments' })

  // GET /comments - Get all comments
  .get('/', async () => {
    try {
      const response = await db.getAll(TABLE, { column: 'id', asc: true });
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }
      const comments = response.data;
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
      const response = await db.getBy(TABLE, { id: commentId });
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }
      const comment = response.data?.[0] || null;

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
      const response = await db.getBy(TABLE, { blog_id: blogId }, { column: 'id', asc: true });
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }
      const comments = response.data;

      if (!comments) {
        return ResponseHelpers.notFound('Comments not found');
      } 

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
      const response = await db.getBy(TABLE, { parent_id: commentId }, { column: 'id', asc: true });
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }
      const replies = response.data;

      if (!replies) {
        return ResponseHelpers.notFound('Replies not found');
      }

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
      const response = await db.insert(TABLE, body);
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }
      const newComment = response.data;
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
      const response = await db.updateBy(TABLE, { id: commentId }, body);
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }
      const updatedComment = response.data;

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
      const response = await db.delete(TABLE, { id: commentId });
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }
      const deletedComment = response.data;

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