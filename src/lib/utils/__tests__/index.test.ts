import { normalizeServiceArgs } from '../';

test('Testing normalizeServiceArgs function', () => {
  expect(
    normalizeServiceArgs({ term: 'javascript', country: 'it', language: 'de' }),
  ).toMatchSnapshot();
  expect(
    normalizeServiceArgs({ term: 'blue jeans', country: 'us', language: 'en' }),
  ).toMatchSnapshot();
});
