//Enum for reaction types  
export enum ReactionType {
    LIKE = 'LIKE',
    DISLIKE = 'DISLIKE',
    HEART = 'HEART',
    ANGRY = 'ANGRY',
}

// Reaction entity- interface definition for Upsert and general use.
export interface ReactionInterface {
    blog_id: number;
    user_id: number;
    type: ReactionType;
}
