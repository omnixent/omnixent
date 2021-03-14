import { config } from "https://deno.land/x/dotenv/mod.ts";

const { ENV = "server" } = config();

switch (ENV) {
  case "lambda":
    console.log("Not implemented yet!");
    break;
  default:
    const { initServer } = await import("./lib/server/index.ts");
    initServer();
    break;
}
