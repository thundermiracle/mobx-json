import { isNativeWidget } from 'lib/utils';

test('is React component', () => {
  const result = isNativeWidget('Div');

  expect(result).toBeFalsy();
});

test('is native component', () => {
  const result = isNativeWidget('div');

  expect(result).toBeTruthy();
});
