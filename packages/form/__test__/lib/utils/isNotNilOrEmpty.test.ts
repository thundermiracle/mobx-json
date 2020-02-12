import { isNotNilOrEmpty } from 'lib/utils';

describe('null, undefined, empty, [], {} returns false', () => {
  test('null', () => {
    expect(isNotNilOrEmpty(null)).toBeFalsy();
  });

  test('undefined', () => {
    expect(isNotNilOrEmpty(undefined)).toBeFalsy();
  });

  test('empty', () => {
    expect(isNotNilOrEmpty('')).toBeFalsy();
  });

  test('[]', () => {
    expect(isNotNilOrEmpty([])).toBeFalsy();
  });

  test('{}', () => {
    expect(isNotNilOrEmpty({})).toBeFalsy();
  });
});

describe('space, 0 returns true', () => {
  test('space', () => {
    expect(isNotNilOrEmpty(' ')).toBeTruthy();
  });

  test('0', () => {
    expect(isNotNilOrEmpty(0)).toBeTruthy();
  });
});

test('a', () => {
  expect(isNotNilOrEmpty('a')).toBeTruthy();
});
