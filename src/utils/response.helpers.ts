import type { ApiResponse } from "../types/api";

export class ResponseHelpers{
    // HTTP 200 - Success with data
    static ok<T>(data: T, message?: string, total?: number): ApiResponse<T>{
        return {
            success: true,
            data,
            message,
            timestamp: new Date().toISOString(),
            status:200
        }
    }

    // HTTP 201 - Resource created successfully
    static created<T>(data: T, message: string = "Resource created successfully"): ApiResponse<T>{
        return{
            success: true,
            data,
            message,
            timestamp: new Date().toISOString(),
            status: 201
        };
    }


    // HTTP 404 - Resource not found
    static notFound(message: string = "Resource not found"): ApiResponse<null> {
        return {
          success: false,
          error: message,
          timestamp: new Date().toISOString(),
          status: 404
        };
      }

    // HTTP 400 - Bad request
    static badRequest(message: string = "Bad request"): ApiResponse<null>{
        return{
            success: false,
            error: message,
            timestamp: new Date().toISOString(),
            status:400
        }
    }

    // HTTP 500 - Internal server error
  static serverError(message: string = "Internal server error"): ApiResponse<null> {
    return {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
      status: 500
    };
  }
}