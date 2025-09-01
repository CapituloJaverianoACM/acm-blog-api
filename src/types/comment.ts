// Main interface - Comment entity
export interface Comment{
    id: number;
    blog_id: number;
    // If the comment's parent id is null, it means it is a top-level comment
    parent_id: number | null;
    content: string;
    owner_id: number;
    created_at: Date;
    last_update: Date;
}

// Create and Update Operations

export interface CreateCommentRequest{
    blog_id: number;
    parent_id?: number | null;
    content: string;
    owner_id: number;
}

export interface UpdateCommentRequest{
    content: string;
}

/*
Retrieve and Delete operations only need an ID parameter 
from the URL, while Create and Update need complex request
bodies with multiple fields, so we only create interfaces
for operations that require structured input data

*/