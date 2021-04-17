import fetch from 'node-fetch';
import { Language } from '../languages';
import { Country } from '../countries';
import { groupBy } from '../utils'; 

export type Service = 'google' | 'amazon' | 'duckduckgo' | 'youtube' | 'bing';

export type Term = string;
export type ServiceResponseObject = {
  category: string;
  originalTerm: string;
  term: string;
  result: string[];
};
export type ServiceResponse = Promise<ServiceResponseObject[]>;

export type ServiceArgs = {
  term: Term;
  language: Language;
  country: Country;
};

export type CallServiceArgs = {
  term: Term;
  language: Language;
  country: Country;
  service: Service;
};

export const availableServices: Service[] = ['google', 'amazon', 'duckduckgo', 'bing', 'youtube'];

export default async function callService(options: CallServiceArgs): Promise<ServiceResponseObject[]> {
  const serviceURL = await import(`./${options.service}`);
  const languageTerms = (await import(`../languages/${options.language}`))?.default;

  const results = await Promise.all(
    Object.keys(languageTerms).map(
      async (prop: string): Promise<ServiceResponseObject> => {
        const terms = languageTerms[prop];

        const responses: ServiceResponseObject[] = await Promise.all(terms.map(async (term: string) => {
          const languageTerm = term.replace(`@`, options.term);
          const res = await (
            await fetch(
              serviceURL.formatURI({
                ...options,
                term: languageTerm,
              }),
            )
          )?.text();

          return {
            category: prop,
            term: languageTerm,
            originalTerm: options.term,
            result: serviceURL.extractBody(res),
          };
        }));

        // @ts-ignore
        return responses;
      },
    )
  );

  // @ts-expect-error
  return groupBy(results.flat(), 'category');
}
