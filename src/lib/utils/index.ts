import { ServiceArgs } from '../services';

export function normalizeServiceArgs({ term, country, language }: ServiceArgs) {
  const t = encodeURIComponent(term.toLowerCase());
  const c = country.toLowerCase();
  const l = language.toUpperCase();

  return {
    t,
    c,
    l,
    hl: `${c}-${l}`,
  };
}

export const groupBy = (list: any[], key: string) =>
  list.reduce((hash, obj) =>
    ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {});
