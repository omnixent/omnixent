import { ServiceArgs } from '.';
import { normalizeServiceArgs } from '../utils';

const endpoint = 'https://www.google.com/complete/search';

export function formatURI(options: ServiceArgs): string {
  const { t, hl } = normalizeServiceArgs(options);
  return `${endpoint}?client=gws-wiz&q=${t}&hl=${hl}`;
}

export function extractBody(response: string) {
  const body = response.replace(/^window\.google\.ac\.h\(/, '').replace(/\)$/, '');

  return JSON.parse(body)
    ?.flat()
    ?.flat()
    ?.filter((el: any) => typeof el === 'string')
    ?.map((term: string) => term.replace(/<b>/gi, ''))
    ?.map((term: string) => term.replace(/<\/b>/gi, ''))
    ?.map((term: string) => term.replace(/&#39;/gi, "'"));
}
