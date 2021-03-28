import { formatURI, extractBody } from '../bing';

test('Testing google formatURI', () => {
  expect(formatURI({ term: 'Node.js', language: 'it', country: 'us' })).toMatchInlineSnapshot(
    `"https://api.bing.com/osjson.aspx?query=node.js&mkt=IT-us"`,
  );
  expect(
    formatURI({ term: 'blue jeans brands', language: 'en', country: 'de' }),
  ).toMatchInlineSnapshot(
    `"https://api.bing.com/osjson.aspx?query=blue%20jeans%20brands&mkt=EN-de"`,
  );
});

test('Testing google extractBody', () => {
  expect(
    extractBody(
      `["node.js",["node.js","node.js download","node.js update","node.js fs","node.js express","node.js cos\u0027e","node.js example","node.js mysql","node.js version","node.js hello world","node.js raspberry pi","node.js server-side javascript"],[],[],{"google:suggestrelevance":[1300,1299,1298,1297,1296,1295,1294,1293,1292,1291,1290,1289]}]`,
    ),
  ).toMatchSnapshot();
  expect(
    extractBody(
      `["blue jeans brands",["blue jeans brands","blue jeans brands list","blue jeans brand names","blue jean brands for men","blue jean brands for women","blue jean brands of the 1960\u0027s and 70\u0027s"],[],[],{"google:suggestrelevance":[1300,1299,1298,1297,1296,1295]}]`,
    ),
  ).toMatchSnapshot();
});
