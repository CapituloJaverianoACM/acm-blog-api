export type ReactionType = 'LIKE' | 'DISLIKE' | 'HEART' | 'ANGRY';

// Reaction entity
export interface ReactionInterface {
    blog_id: number;
    user_id: number;
    type: ReactionType;
}

// Create and Update operations share the same structure(Upsert)
export interface CreateUpdateReactionInterface {
    blog_id: number;
    user_id: number;
    type: ReactionType;
} 
