export interface Idatabase {
    
    insert<T>(
    table: string,
    data: T,
    ): Promise<{ error: string | null; data: any }>;
    getAll(
        table: string,
        order?: {
        column: string;
        asc?: boolean;
        },
        limit?: number,
    ): Promise<{ error: string | null; data: any }>;
    getBy<T>(
        table: string,
        query: Partial<T>,
        order?: {
        column: string;
        asc?: boolean;
        },
        limit?: number,
    ): Promise<{ error: string | null; data: any }>;
    update<T>(
        table: string,
        query: Partial<T>,
        data: T,
    ): Promise<{ error: string | null; data: any }>;
    updateBy<T, DTO>(
        table: string,
        query: Partial<T>,
        data: DTO,
    ): Promise<{ error: string | null; data: any }>;
    delete<T>(
        table: string,
        query: Partial<T>,
    ): Promise<{ error: string | null; data: any }>;
}