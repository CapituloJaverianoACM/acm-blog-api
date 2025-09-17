import { Elysia } from 'elysia';
import { CreateBlogImageSchema, UpdateBlogImageSchema, BlogImageParamsSchema } from '../schemas/blogImage.schemas';
import { ResponseHelpers } from '../utils/response.helpers';
import { SupabaseAdaapter } from '../repositories/supabase.adapter';
import { IDatabase } from '../repositories/database.interface';

const TABLE = 'blog-image';
const db: IDatabase = SupabaseAdaapter.getInstance();

export const blogImageRoutes = new Elysia({ prefix: '/blog-image' })

  // GET /blog-image - Get all blog images
  .get('/', async () => {
    try {
      const response = await db.getAll(TABLE, { column: 'id', asc: true });
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }
      const blogImages = response.data;
      return ResponseHelpers.ok(
        blogImages, 
        "Blog Images retrieved successfully", 
        blogImages.length
      );
    } catch (error) {
      return ResponseHelpers.serverError("Failed to retrieve blog images");
    }
  })

  // GET /blog-image/:id - Get a specific blog image
  .get('/:id', async ({ params: { id } }) => {
    try {
      const blogImageId = parseInt(id);
      const response = await db.getBy(TABLE, { id: blogImageId });
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }
      const blogImages = response.data?.[0] || null;

      if (!blogImages) {
        return ResponseHelpers.notFound('Blog Image not found');
      }

      return ResponseHelpers.ok(blogImages, "Blog Image retrieved successfully");
    } catch (error) {
      return ResponseHelpers.serverError("Failed to retrieve blog image");
    }
  }, {
    params: BlogImageParamsSchema 
  })

  // GET /blog-image/blog/:blog_id - Get blog images for a specific blog
  .get('/blog/:blog_id', async ({ params: { blog_id } }) => {
    try {
      const blogId = parseInt(blog_id);
      const response = await db.getBy(TABLE, { blog_id: blogId }, { column: 'id', asc: true });
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }
      const blogImages = response.data?.[0] || null;

      if (!blogImages) {
        return ResponseHelpers.notFound('Blog images not found');
      } 

      return ResponseHelpers.ok(
        blogImages, 
        `blog images for blog ${blogId} retrieved successfully`, 
        blogImages.length
      );
    } catch (error) {
      return ResponseHelpers.serverError("Failed to retrieve blog images");
    }
  })

  // POST /blog-image - Create a new blog image
  .post('/', async ({ body }) => {
    try {
      const response = await db.insert(TABLE, body);
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }
      const newBlogImage = response.data;
      return ResponseHelpers.created(newBlogImage, "Blog Image created successfully");
    } catch (error) {
      return ResponseHelpers.serverError("Failed to create blog image");
    }
  }, {
    body: CreateBlogImageSchema
  })

  // PUT /blog-image/:id - Update a blog image
  .put('/:id', async ({ params: { id }, body }) => {
    try {
      const blogImageId = parseInt(id);
      const response = await db.updateBy(TABLE, { id: blogImageId }, body);
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }

      const updatedBlogImage = response.data?.[0] || null;;

      if (!updatedBlogImage) {
        return ResponseHelpers.notFound('Blog Image not found');
      }

      return ResponseHelpers.ok(updatedBlogImage, "Blog Image updated successfully");
    } catch (error) {
      return ResponseHelpers.serverError("Failed to update comment");
    }
  }, {
    params: BlogImageParamsSchema,
    body: UpdateBlogImageSchema
  })

  // DELETE /blog-image/:id - Delete a blog image
  .delete('/:id', async ({ params: { id } }) => {
    try {
      const blogImageId = parseInt(id);
      const response = await db.delete(TABLE, { id: blogImageId });
      if (response.error) {
        return ResponseHelpers.serverError(response.error);
      }
      const deletedBlogImage = response.data?.[0] || null;

      if (!deletedBlogImage) {
        return ResponseHelpers.notFound('Blog Image not found');
      }

      return ResponseHelpers.ok(deletedBlogImage, "Blog Image deleted successfully");
    } catch (error) {
      return ResponseHelpers.serverError("Failed to delete blog image");
    }
  }, {
    params: BlogImageParamsSchema
  });