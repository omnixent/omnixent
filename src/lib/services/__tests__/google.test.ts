import { formatURI, extractBody } from '../google';

test('Testing google formatURI', () => {
  expect(formatURI({ term: 'Node.js', language: 'it', country: 'us' })).toMatchInlineSnapshot(
    `"https://www.google.com/complete/search?client=gws-wiz&q=node.js&hl=us-IT"`,
  );
  expect(
    formatURI({ term: 'blue jeans brands', language: 'en', country: 'de' }),
  ).toMatchInlineSnapshot(
    `"https://www.google.com/complete/search?client=gws-wiz&q=blue%20jeans%20brands&hl=de-EN"`,
  );
});

test('Testing google extractBody', () => {
  expect(
    extractBody(
      `window.google.ac.h([[["blue jeans brands",0,[19]],["blue jeans brands\u003cb\u003e list\u003c\/b\u003e",0,[19]],["blue jeans brands\u003cb\u003e from the 90s\u003c\/b\u003e",0,[19]],["\u003cb\u003etop \u003c\/b\u003eblue jeans brands",0,[22,30,19]],["\u003cb\u003eexpensive \u003c\/b\u003eblue jeans brands",0,[22,30,19]],["\u003cb\u003etarget \u003c\/b\u003eblue jeans brands",0,[22,30,19]],["\u003cb\u003emens \u003c\/b\u003eblue jeans brands",0,[22,30,19]],["\u003cb\u003ewestern \u003c\/b\u003eblue jeans brands",0,[22,30,19]],["\u003cb\u003efamous \u003c\/b\u003eblue jeans brands",0,[22,30,19]],["\u003cb\u003esargent \u003c\/b\u003eblue jeans brands",0,[22,30,19]]],{"i":"blue jeans brands","l":"1","q":"ByZYgqmh8L85teUO48aZdL7g8xE"}])`,
    ),
  ).toMatchSnapshot();
  expect(
    extractBody(
      `window.google.ac.h([[["node\u003cb\u003e.\u003c\/b\u003ejs",0],["node\u003cb\u003e.\u003c\/b\u003ejs\u003cb\u003e download\u003c\/b\u003e",0],["node\u003cb\u003e.\u003c\/b\u003ejs\u003cb\u003e server-side javascript\u003c\/b\u003e",0],["node\u003cb\u003e.\u003c\/b\u003ejs\u003cb\u003e tutorial\u003c\/b\u003e",0],["node\u003cb\u003e.\u003c\/b\u003ejs\u003cb\u003e what is\u003c\/b\u003e",0],["node\u003cb\u003e.\u003c\/b\u003ejs\u003cb\u003e express\u003c\/b\u003e",0],["node\u003cb\u003e.\u003c\/b\u003ejs\u003cb\u003e cos\u0026#39;è\u003c\/b\u003e",0],["node\u003cb\u003e.\u003c\/b\u003ejs\u003cb\u003e server-side javascript virus\u003c\/b\u003e",0],["node\u003cb\u003e.\u003c\/b\u003ejs\u003cb\u003e windows 7\u003c\/b\u003e",0],["node\u003cb\u003e.\u003c\/b\u003ejs\u003cb\u003e require\u003c\/b\u003e",0]],{"q":"ByZYgqmh8L85teUO48aZdL7g8xE"}])`,
    ),
  ).toMatchSnapshot();
});
