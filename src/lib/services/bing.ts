import { ServiceArgs } from "./index.ts";
import { normalizeServiceArgs } from "../utils/index.ts";

const endpoint = "https://api.bing.com/osjson.aspx";

export function formatURI(options: ServiceArgs): string {
  const { t, c, l } = normalizeServiceArgs(options);
  return `${endpoint}?query=${t}&mkt=${l}-${c}`;
}

export function extractBody(response: string) {
  return JSON
    .parse(response)[1]
    ?.map((phrase: string) => phrase);
}
