export interface BlogImage {
    id: number;
    blog_id: number;
    url: string;
    alt: string;
}

export interface CreateBlogImageRequest {
    blog_id: number;
    url: string;
    alt?: string;
}   

export interface UpdateBlogImageRequest {
    url?: string;
    alt?: string;
}