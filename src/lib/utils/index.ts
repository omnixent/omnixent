import { ServiceArgs } from "../services/index.ts";

export function normalizeServiceArgs({ term, country, language }: ServiceArgs) {
  const t = encodeURIComponent(term);
  const c = country.toLowerCase();
  const l = language.toUpperCase();

  return {
    t,
    c,
    l,
    hl: `${c}-${l}`,
  };
}
