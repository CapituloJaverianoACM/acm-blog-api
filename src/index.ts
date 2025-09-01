import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { swaggerConfig, welcomeMessage } from "./utils/app.config";
import { commentRoutes } from "./routes/comment.routes";
import { ShutdownHandler } from "./utils/shutdown-handler";

const app = new Elysia()
  .use(swagger(swaggerConfig))
  .get("/", () => welcomeMessage)
  .use(commentRoutes)
  .listen(5454);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
console.log('Comments API: http://localhost:5454/comments - Done by JuanBap');

//Shutdown of the server in a appropiate way
ShutdownHandler.setupSignalHandlers(app);