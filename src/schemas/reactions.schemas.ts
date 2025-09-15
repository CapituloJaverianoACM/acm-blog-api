import { t } from "elysia";
//Enum for reaction types
export const ReactionTypeSchema = t.Union([
    t.Literal('LIKE'),
    t.Literal('DISLIKE'),
    t.Literal('HEART'),
    t.Literal('ANGRY')
]);

// Schema for creating/Updating a new reaction
export const CreateUpdateReactionSchema = t.Object({
    blog_id: t.Number({minimum: 1 }),
    user_id: t.Number({minLength: 1,
        description: "User ID must not be empty"
    }),
    type: ReactionTypeSchema
    });
