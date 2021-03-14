import { ServiceArgs } from "./index.ts";
import { normalizeServiceArgs } from "../utils/index.ts";

const endpoint = "https://api.bing.com/osjson.aspx";

export function formatURI(options: ServiceArgs): string {
  const { t, hl } = normalizeServiceArgs(options);
  return `${endpoint}?query=${t}&cc=${hl}`;
}

export function extractBody(response: string) {
  return JSON
    .parse(response)[1]
    ?.map((phrase: string) => phrase);
}
