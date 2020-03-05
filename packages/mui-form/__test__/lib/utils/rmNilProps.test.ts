import { rmNilProps } from 'lib/utils';

test('empty object', () => {
  const result = rmNilProps({});

  expect(result).toEqual({});
});

test('remove undefined, null', () => {
  const result = rmNilProps({ a: undefined, b: null, c: 1, d: '2' });

  expect(result).toEqual({ c: 1, d: '2' });
});

test('no undefined null', () => {
  const result = rmNilProps({ c: 1, d: '2' });

  expect(result).toEqual({ c: 1, d: '2' });
});
