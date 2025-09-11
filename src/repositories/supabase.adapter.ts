import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { IDatabase } from "./database.interface";
import { DBResponse } from "../types/database";

export class SupabaseAdaapter implements IDatabase {
    private static instance: SupabaseAdaapter | null = null;
    private client: SupabaseClient;
    
    private constructor() {
        this.client = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_ANON_KEY!);
    }

    public static getInstance(): SupabaseAdaapter {
        if(this.instance === null) {
            this.instance = new SupabaseAdaapter();
        }
        return this.instance;
    }

    async insert<T>(table: string, data: T): Promise<DBResponse> {
        const { error, data: result } = await this.client.from(table).insert(data);
        return this.assembleResponse(error, result);
    }

    async getAll(table: string, order?: { column: string; asc?: boolean; }, 
    limit?: number): Promise<{ error: string | null; data: any; }>{

        let req = this.client.from(table).select('*');
        
        if(order) {
            req = req.order(order.column, { ascending: order.asc ?? false });
        }

        const { error, data } = await req;
        return this.assembleResponse(error, data);
    }

    async getBy<T>(table: string, query: Partial<T>, order?: { column: string; asc?: boolean; }, limit?: number): 
    Promise<DBResponse> {
        let req = this.client.from(table).select('*').match(query);
        
        if(order) {
            req = req.order(order.column, { ascending: order.asc ?? false });
        }

        const { error, data } = await req;
        return this.assembleResponse(error, data);
    }
    async updateBy<T,DTO>(table: string, query: Partial<T>, data: DTO): Promise<DBResponse> {
        const { error, data: result } = await this.client.from(table).update(data).match(query).select();
        return this.assembleResponse(error, result);
    }
    async delete<T>(table: string, query: Partial<T>): Promise<DBResponse> {
        const { error, data: result } = await this.client.from(table).delete().match(query).select();
        return this.assembleResponse(error, result);
    }

    private assembleResponse(error: any, data: any) {
    if (error) return { error: error.message || "Unknown error", data: null };
    return { error: null, data };
    }
}