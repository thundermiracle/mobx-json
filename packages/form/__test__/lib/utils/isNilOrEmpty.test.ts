import { isNilOrEmpty } from 'lib/utils';

describe('null, undefined, empty, [], {} returns true', () => {
  test('null', () => {
    expect(isNilOrEmpty(null)).toBeTruthy();
  });

  test('undefined', () => {
    expect(isNilOrEmpty(undefined)).toBeTruthy();
  });

  test('empty', () => {
    expect(isNilOrEmpty('')).toBeTruthy();
  });

  test('[]', () => {
    expect(isNilOrEmpty([])).toBeTruthy();
  });

  test('{}', () => {
    expect(isNilOrEmpty({})).toBeTruthy();
  });
});

describe('space, 0 returns false', () => {
  test('space', () => {
    expect(isNilOrEmpty(' ')).toBeFalsy();
  });

  test('0', () => {
    expect(isNilOrEmpty(0)).toBeFalsy();
  });
});

test('a', () => {
  expect(isNilOrEmpty('a')).toBeFalsy();
});
