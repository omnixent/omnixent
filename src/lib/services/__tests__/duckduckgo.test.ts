import { formatURI, extractBody } from '../duckduckgo';

test('Testing google formatURI', () => {
  expect(formatURI({ term: 'Node.js', language: 'it', country: 'us' })).toMatchInlineSnapshot(
    `"https://duckduckgo.com/ac/?client=psy-ab&q=node.js&kl=us-IT"`,
  );
  expect(
    formatURI({ term: 'blue jeans brands', language: 'en', country: 'de' }),
  ).toMatchInlineSnapshot(
    `"https://duckduckgo.com/ac/?client=psy-ab&q=blue%20jeans%20brands&kl=de-EN"`,
  );
});

test('Testing google extractBody', () => {
  expect(
    extractBody(
      `[{"phrase":"node.js"},{"phrase":"node.js download"},{"phrase":"node.js mongodb"},{"phrase":"node.js tutorial"},{"phrase":"node.js fs"},{"phrase":"node.js mysql"},{"phrase":"node.js ubuntu"},{"phrase":"node.js project"}]`,
    ),
  ).toMatchSnapshot();
  expect(
    extractBody(
      `[{"phrase":"blue jeans brands"},{"phrase":"blue jeans brands list"},{"phrase":"blue jeans brand names"}]`,
    ),
  ).toMatchSnapshot();
});
