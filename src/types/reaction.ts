// Reaction entity
export interface ReactionInterface {
    blog_id: number;
    user_id: number;
    type: 'LIKE' | 'DISLIKE' | 'HEART' | 'ANGRY';
}

// Create and update Reaction Request Interface
export interface CreateReactionInterface {
    blog_id: number;
    user_id: number;
    type: 'LIKE' | 'DISLIKE' | 'HEART' | 'ANGRY' ;
} 
