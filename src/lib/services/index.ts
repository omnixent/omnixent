import { Language } from "../languages/index.ts";
import { Country } from "../countries/index.ts";

type Service =
  | "google"
  | "amazon"
  | "duckduckgo"
  | "youtube"
  | "bing";

export type Term = string;
export type ServiceResponseObject = {
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

export default async function callService(
  options: CallServiceArgs,
): ServiceResponse {
  const serviceURL = await import(`./${options.service}.ts`);
  const languageTerms = (await import(`../languages/${options.language}.ts`))
    ?.default;

  return Promise.all(
    languageTerms.map(async (term: string): Promise<ServiceResponseObject> => {
      const languageTerm = term.replace(`@`, options.term);
      const res = await (await fetch(serviceURL.formatURI({
        ...options,
        term: languageTerm,
      })))?.text();

      return {
        term: languageTerm,
        originalTerm: options.term,
        result: serviceURL.extractBody(res),
      };
    }),
  );
}
