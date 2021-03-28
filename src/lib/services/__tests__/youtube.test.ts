import { formatURI, extractBody } from '../youtube';

test('Testing google formatURI', () => {
  expect(formatURI({ term: 'Node.js', language: 'it', country: 'us' })).toMatchInlineSnapshot(
    `"https://clients1.google.com/complete/search?&client=youtube&gs_ri=youtube&q=node.js&hl=us-IT"`,
  );
  expect(
    formatURI({ term: 'blue jeans brands', language: 'en', country: 'de' }),
  ).toMatchInlineSnapshot(
    `"https://clients1.google.com/complete/search?&client=youtube&gs_ri=youtube&q=blue%20jeans%20brands&hl=de-EN"`,
  );
});

test('Testing google extractBody', () => {
  expect(
    extractBody(
      `window.google.ac.h(["node.js",[["node.js download",0],["node.js",0],["node.js server-side javascript",0],["node.js tutorial",0],["node.js cos\u0027è",0],["node.js express",0],["node.js windows 7",0],["node.js server-side javascript virus",0],["node.js path",0],["node.js wikipedia",0],["node.js what is",0],["node.js require",0],["node.js docker",0],["node.js websocket",0]],{"k":1,"q":"ByZYgqmh8L85teUO48aZdL7g8xE"}])`,
    ),
  ).toMatchSnapshot();
  expect(
    extractBody(
      `window.google.ac.h(["blue jeans brands",[["blue jeans brands",0,[19]],["blue jeans brands from the 90s",0,[19]],["blue jeans brands list",0,[19]],["top blue jeans brands",0,[22,30,19]],["expensive blue jeans brands",0,[22,30,19]],["target blue jeans brands",0,[22,30,19]],["mens blue jeans brands",0,[22,30,19]],["western blue jeans brands",0,[22,30,19]],["famous blue jeans brands",0,[22,30,19]],["sargent blue jeans brands",0,[22,30,19]]],{"k":1,"q":"ByZYgqmh8L85teUO48aZdL7g8xE"}])`,
    ),
  ).toMatchSnapshot();
});
