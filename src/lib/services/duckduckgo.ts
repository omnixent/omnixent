import { ServiceArgs } from '.';
import { normalizeServiceArgs } from '../utils';

const endpoint = 'https://duckduckgo.com/ac/';

export function formatURI(options: ServiceArgs): string {
  const { t, hl } = normalizeServiceArgs(options);
  return `${endpoint}?client=psy-ab&q=${t}&kl=${hl}`;
}

export function extractBody(response: string) {
  return JSON.parse(response)?.map(({ phrase }: any) => phrase);
}
