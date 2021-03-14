import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import apiRoutes from "./routes/api.ts";

const { PORT = "8000" } = config();

export async function initServer() {
  const app = new Application();

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  });

  app.use(apiRoutes.routes());
  app.use(apiRoutes.allowedMethods());

  await app.listen({ port: parseInt(PORT) });
}
