import compute from 'lib/compute';

describe('concat', () => {
  test('extra is space', () => {
    const targetFieldsVal = { firstName: 'Daniel', lastName: 'Wood' };

    const result = compute('concat', targetFieldsVal, ' ');
    const expected = 'Daniel Wood';

    expect(result).toEqual(expected);
  });

  test('extra is not set', () => {
    const targetFieldsVal = { firstName: 'Daniel', lastName: 'Wood' };

    const result = compute('concat', targetFieldsVal);
    const expected = 'DanielWood';

    expect(result).toEqual(expected);
  });

  test('targetFieldsVal is empty', () => {
    const targetFieldsVal = {};

    const result = compute('concat', targetFieldsVal, ' ');
    const expected = '';

    expect(result).toEqual(expected);
  });
});

describe('sum', () => {
  test('value is number', () => {
    const targetFieldsVal = { profit1: 1, profit2: 2, profit3: 3 };

    const result = compute('sum', targetFieldsVal);
    const expected = 6;

    expect(result).toEqual(expected);
  });

  test('value is number and string number', () => {
    const targetFieldsVal = { profit1: '1', profit2: 2, profit3: 3 };

    const result = compute('sum', targetFieldsVal);
    const expected = 6;

    expect(result).toEqual(expected);
  });

  test('value contains invalid character', () => {
    const targetFieldsVal = { profit1: 1, profit2: '2c', profit3: 3 };

    const result = compute('sum', targetFieldsVal);
    const expected = 0;

    expect(result).toEqual(expected);
  });

  test('targetFieldsVal is empty', () => {
    const targetFieldsVal = {};

    const result = compute('sum', targetFieldsVal);
    const expected = 0;

    expect(result).toEqual(expected);
  });
});

test('method is not exist', () => {
  const result = compute('not exist', { profit1: 1 });

  expect(result).toEqual('');
});
