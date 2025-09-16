import {Elysia} from "elysia";
import {CreateUpdateReactionSchema, ReactionParamsSchema, BlogParamsSchema, UserParamsSchema} from "../schemas/reactions.schemas";
import {ResponseHelpers} from "../utils/response.helpers";
import {SupabaseAdaapter} from "../repositories/supabase.adapter";
import {IDatabase} from "../repositories/database.interface";  
const TABLE = 'reaction';
const db: IDatabase = SupabaseAdaapter.getInstance();

export const reactionRoutes = new Elysia({prefix: '/reactions'})

    // GET /reactions - Get all reactions
    .get('/', async () => {
        try {
            const response = await db.getAll(TABLE, {column: 'blog_id', asc: true});
            if (response.error) {
                return ResponseHelpers.serverError(response.error);
            }
            const reactions = response.data;
            return ResponseHelpers.ok(
                reactions,
                "Reactions retrieved successfully",
                reactions.length
            );
        } catch (error) {
            return ResponseHelpers.serverError("Failed to retrieve reactions");
        }
    })

    // GET /reactions/:blog_id/:user_id - Get a specific reaction by compound key (blog_id, user_id)
    .get('/:blog_id/:user_id', async ({params: {blog_id, user_id}}) => {
        try {
            const blogId = parseInt(blog_id);
            const userId = parseInt(user_id);
            const response = await db.getBy(TABLE, {blog_id: blogId, user_id: userId});
            if (response.error) {
                return ResponseHelpers.serverError(response.error);
            }
            const reaction = response.data?.[0] || null;

            if (!reaction) {
                return ResponseHelpers.notFound('Reaction not found');
            }

            return ResponseHelpers.ok(reaction, "Reaction retrieved successfully");
        } catch (error) {
            return ResponseHelpers.serverError("Failed to retrieve reaction");
        }
    }, {
        params: ReactionParamsSchema
    }) 
    // GET /reactions/blog/:blog_id - Get all reactions for a specific blog
    .get('/blog/:blog_id', async ({params: {blog_id}}) => {
        try {
            const blogId = parseInt(blog_id);
            const response = await db.getBy(TABLE, {blog_id: blogId}, {column: 'user_id', asc: true});
            if (response.error) {
                return ResponseHelpers.serverError(response.error);
            }
            const reactions = response.data || [];
            return ResponseHelpers.ok(
                reactions,
                "Reactions for blog retrieved successfully",
                reactions.length
            );
        } catch (error) {
            return ResponseHelpers.serverError("Failed to retrieve reactions for blog");
        }
    }, {
        params: BlogParamsSchema
    })
    // POST /reactions - Create or update a reaction (upsert)
    .post('/', async ({ body }) => {
        try {
            const {blog_id, user_id, type} = body;

            // Check if the reaction already exists
            const existingResponse = await db.getBy(TABLE, {blog_id, user_id});
            if (existingResponse.error) {
                return ResponseHelpers.serverError(existingResponse.error);
            }

            const existingReaction = existingResponse.data?.[0];
            let response;
            let message;

            if (existingReaction) {
                // Update the existing reaction
                response = await db.updateBy(TABLE, {type}, {blog_id, user_id});
                message = "Reaction updated successfully";
            } else {
                // Create a new reaction
                response = await db.insert(TABLE, {blog_id, user_id, type});
                message = "Reaction created successfully";
            }
            if (response.error) {
                return ResponseHelpers.serverError(response.error);
            }

            const reaction = response.data?.[0] || response.data;
            return ResponseHelpers.created(reaction, message);
        } catch (error) {
            return ResponseHelpers.serverError("Failed to create or update reaction");
        }
    }, {
        body: CreateUpdateReactionSchema
    })
    //PUT /reactions/:blog_id/:user_id - Update a reaction
.put('/:blog_id/:user_id', async ({params: {blog_id, user_id}, body}) => {
        try {
            const blogId = parseInt(blog_id);
            const userId = parseInt(user_id);
            const {type} = body;
            const response = await db.updateBy(TABLE, {type:body.type}, {blog_id: blogId, user_id: userId});
            if (response.error) {
                return ResponseHelpers.serverError(response.error);
            }
            const Updatedreaction = response.data?.[0] || null;

            if(!Updatedreaction) {
                return ResponseHelpers.notFound('Reaction not found');
            }
            return ResponseHelpers.ok(Updatedreaction, "Reaction updated successfully");
        } catch (error) {
            return ResponseHelpers.serverError("Failed to update reaction");
        }
    }, {
        params: ReactionParamsSchema,
        body: CreateUpdateReactionSchema
    })

    // DELETE /reactions/:blog_id/:user_id - Delete a reaction 
    .delete('/:blog_id/:user_id', async ({params: {blog_id, user_id}}) => {
        try {
            const blogId = parseInt(blog_id);
            const userId = parseInt(user_id);
            const response = await db.delete(TABLE, {blog_id: blogId, user_id: userId});
            if (response.error) {
                return ResponseHelpers.serverError(response.error);
            }
            const deletedReaction = response.data?.[0] || null;

            if (!deletedReaction) {
                return ResponseHelpers.notFound('Reaction not found');
            }
            return ResponseHelpers.ok(deletedReaction, "Reaction deleted successfully");
        } catch (error) {
            return ResponseHelpers.serverError("Failed to delete reaction");
        }
    }, {
        params: ReactionParamsSchema
    });
