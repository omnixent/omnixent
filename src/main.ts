import callService from './lib/services/index.ts';

callService({ service: 'duckduckgo', term: 'java', language: 'en', country: 'us' })
  .then(console.log)
  .catch(console.log)