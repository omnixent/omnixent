import { normalizeServiceArgs, groupBy } from '../';

test('Testing normalizeServiceArgs function', () => {
  expect(
    normalizeServiceArgs({ term: 'javascript', country: 'it', language: 'de' }),
  ).toMatchSnapshot();
  expect(
    normalizeServiceArgs({ term: 'blue jeans', country: 'us', language: 'en' }),
  ).toMatchSnapshot();
});

test('Testing groupBy function', () => {
  const arr = [
    {
      make: 'apple',
      product: 'ipod'
    },
    {
      make: 'apple',
      product: 'iphone'
    },
    {
      make: 'samsung',
      product: 'galaxy'
    },
    {
      make: 'xiaomi',
      product: 'mi'
    },
  ];

  expect(groupBy(arr, 'make')).toMatchSnapshot();
})