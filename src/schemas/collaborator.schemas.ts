import { t } from "elysia";

// Schema for creating a collaborator
export const createCollaboratorSchema = t.Object({
    blog_id: t.Number({minimum: 1}),
    user_id: t.String( {minLength: 1}) 
});

// Schema for params using composite key (blog_id, user_id)
export const collaboratorParamsSchema = t.Object({
    blog_id: t.Number({
        pattern: "^[0-9]+$",
        description: "User ID must be numeric",
    }),
    user_id: t.String({
        minLength: 1,
        description: "User ID must be a non-empty string",
    }),
});

// schemas for params using blog_id to get all collaborators of a blog
export const blogIdParamsSchema = t.Object({
    blog_id: t.Number({
        pattern: "^[0-9]+$",
        description: "Blog ID must be numeric",
    }),
});