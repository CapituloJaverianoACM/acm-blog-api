import { DBResponse } from "../types/database";

export interface IDatabase {
    
    insert<T>(
    table: string,
    data: T,
    ): Promise<DBResponse>;
    getAll(
        table: string,
        order?: {
        column: string;
        asc?: boolean;
        },
        limit?: number,
    ): Promise<DBResponse>;
    getBy<T>(
        table: string,
        query: Partial<T>,
        order?: {
        column: string;
        asc?: boolean;
        },
        limit?: number,
    ): Promise<DBResponse>;
    updateBy<T, DTO>(
        table: string,
        query: Partial<T>,
        data: DTO,
    ): Promise<DBResponse>;
    delete<T>(
        table: string,
        query: Partial<T>,
    ): Promise<DBResponse>;
}