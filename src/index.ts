import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { swaggerConfig, welcomeMessage } from "./utils/app.config";
import { commentRoutes } from "./routes/comment.routes";
import { ShutdownHandler } from "./utils/shutdown-handler";
import { blogImageRoutes } from "./routes/blogImage.routes";
import { reactionRoutes } from './routes/reaction.routes';

const PORT = Number(process.env.PORT) || 5454;

const app = new Elysia()
  .use(swagger(swaggerConfig))
  .get("/", () => welcomeMessage)
  .use(commentRoutes)
  .use(blogImageRoutes)
  .use(reactionRoutes)
  .listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
console.log(`Comments API: http://localhost:${PORT}/comments - Done by JuanBap`);
console.log(`Reactions API: http://localhost:${PORT}/reactions - Done by Ivan140826`);
console.log(`Blog Images API: http://localhost:${PORT}/blog-image - Done by Arkan56`); 
//Shutdown of the server in a appropiate way
ShutdownHandler.setupSignalHandlers(app);