import { ServiceArgs } from '.';
import { normalizeServiceArgs } from '../utils';

const endpoint = 'https://completion.amazon.co.uk/api/2017/suggestions';

export function formatURI(options: ServiceArgs): string {
  const { t, hl } = normalizeServiceArgs(options);
  return `${endpoint}?page-type=Gateway&client-info=amazon-search-ui&mid=APJ6JRA9NG5V4&alias=aps&suggestion-type=KEYWORD&prefix=${t}&lop=${hl}`;
}

export function extractBody(response: string) {
  return JSON?.parse(response)?.suggestions?.map(({ value }: any) => value);
}
