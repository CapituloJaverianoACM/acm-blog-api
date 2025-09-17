import {t} from "elysia";

// Schema for creating a new blog image
export const CreateBlogImageSchema = t.Object({
    blog_id: t.Number({ minimum: 1 }),
    url: t.String({
        format: "uri",
        description: "URL must be a valid URI"
    }),
    alt: t.Optional(t.String({
        minLength: 1,
        maxLength: 255,
        description: "Alt text must be between 1-255 characters long"
    }))
});

// Schema for updating a blog image
export const UpdateBlogImageSchema = t.Object({
    url: t.Optional(t.String({
        format: "uri",
        description: "URL must be a valid URI"
    })),
    alt: t.Optional(t.String({
        minLength: 1,
        maxLength: 255,
        description: "Alt text must be between 1-255 characters long"
    }))
});

// Schema for deleting and retrieving a blog image (GET, DELETE http methods)
export const BlogImageParamsSchema = t.Object({
    id: t.String({
        // Regular expression for validating only numeric types
        pattern: "^[0-9]+$",
        description: "Blog Image ID must be numeric"
    })
});