import { t } from "elysia";
import { ReactionType } from "../types/reaction";

// Schema for ReactionType enum
export const ReactionTypeSchema = t.Enum(ReactionType, {
    description: "Type of reaction",
    examples: Object.values(ReactionType)
});

// Schema for creating/Updating a new reaction, using upsert method
export const CreateUpdateReactionSchema = t.Object({
    blog_id: t.Number({minimum: 1 }),
    user_id: t.Number({minimum: 1}),
    type: ReactionTypeSchema,
    });
 
// Schema for params using compound key (blog_id, user_id)
export const ReactionParamsSchema = t.Object({
    blog_id: t.String ({
        pattern: "^[0-9]+$",
        description: "Blog ID must be numeric",
    }),
    user_id: t.String ({
        pattern: "^[0-9]+$",
        description: "User ID must be numeric",
    }),
});

// Schema for params using blog_id reactions
export const BlogParamsSchema = t.Object({
    blog_id: t.String ({
        pattern: "^[0-9]+$",
        description: "Blog ID must be numeric",
    }),
});

// Schema for params using user_id reactions
export const UserParamsSchema = t.Object({
    user_id: t.String ({
        pattern: "^[0-9]+$",
        description: "User ID must be numeric",
    }),
});

