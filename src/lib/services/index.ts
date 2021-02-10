import { Language } from '../languages/index.ts';
import { Country } from '../countries/index.ts';

type Service =
  | 'google'
  | 'amazon'
  | 'duckduckgo'
  | 'youtube'
  | 'bing';

type Term = string;

export type ServiceArgs = {
  term:     Term;
  language: Language;
  country:  Country;
};

export type CallServiceArgs = {
  term:     Term;
  language: Language;
  country:  Country;
  service:  Service
};

const servicesMap: any = {
  google:     import('./google.ts'),
  youtube:    import('./youtube.ts'),
  amazon:     import('./amazon.ts'),
  duckduckgo: import('./duckduckgo.ts')
};

export default async function callService({service, ...options}: CallServiceArgs): Promise<any> {
  const s = await servicesMap[service];

  try {
    const req = await fetch(s.formatURI(options));
    const res = await req.text();
    return s.extractBody(res);
  } catch (err) {
    console.log(err);
  }
};
