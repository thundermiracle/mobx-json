import { isNotNil } from 'lib/utils';

describe('null, undefined returns false', () => {
  test('null', () => {
    expect(isNotNil(null)).toBeFalsy();
  });

  test('undefined', () => {
    expect(isNotNil(undefined)).toBeFalsy();
  });
});

describe('empty, space, [], {}, 0 returns true', () => {
  test('empty, space', () => {
    expect(isNotNil('')).toBeTruthy();
    expect(isNotNil(' ')).toBeTruthy();
  });

  test('[]', () => {
    expect(isNotNil([])).toBeTruthy();
  });

  test('{}', () => {
    expect(isNotNil({})).toBeTruthy();
  });

  test('0', () => {
    expect(isNotNil(0)).toBeTruthy();
  });
});

test('a', () => {
  expect(isNotNil('a')).toBeTruthy();
});
