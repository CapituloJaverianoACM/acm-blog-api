import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { swaggerConfig, welcomeMessage } from "./utils/app.config";
import { commentRoutes } from "./routes/comment.routes";
import { ShutdownHandler } from "./utils/shutdown-handler";
import { reactionRoutes } from './routes/reaction.routes';

const app = new Elysia()
  .use(swagger(swaggerConfig))
  .get("/", () => welcomeMessage)
  .use(commentRoutes)
  .use(reactionRoutes)
  .listen(5454);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
console.log('Comments API: http://localhost:5454/comments - Done by JuanBap');
console.log('Reactions API: http://localhost:5454/reactions - Done by Ivan140826'); 
//Shutdown of the server in a appropiate way
ShutdownHandler.setupSignalHandlers(app);