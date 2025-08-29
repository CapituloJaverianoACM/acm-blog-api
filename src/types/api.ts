/*
A standardized response format for API endpoints
This interface helps maintain consistency in how our API responds to requests
 */

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    count?: number;
  }