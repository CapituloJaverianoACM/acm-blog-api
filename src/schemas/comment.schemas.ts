import { t } from "elysia";

// Schema for creating a new comment
export const CreateCommentSchema = t.Object({
    blog_id: t.Number({minimum: 1 }),
    parent_id: t.Optional(t.Union([t.Number({minimum: 1}), t.Null()])),
    content: t.String({
        minLength: 1,
        maxLength: 1000,
        description: "Comment content must be between 1-1000 characters long"
    }),
    owner_id: t.Number({minimum: 1})
});

// Schema for updating a new comment
export const UpdateCommentSchema = t.Object({
    content: t.Optional(t.String({
        minLength: 1,
        maxLength: 1000,
        description: "Updated comment content must be between 1-1000 characters long"
    }))
});

// Schema for deleting and retreiving a comment (GET, DELETE http methods)
export const CommentParamsSchema = t.Object({
    id: t.String({
        //Regular expression for validating only numeric types
        pattern: "^[0-9]+$",
        description: "Comment ID must be numeric"
    })
});