import makeWidgetMap from 'lib/makeWidgetMap';

const allComponents = {
  TextField: (): string => 'TextField Component',
  Button: (): string => 'Button Component',
};

test('no hoc return immediately', () => {
  const result1 = makeWidgetMap(allComponents);
  const result2 = makeWidgetMap(allComponents, []);

  expect(result1).toEqual(allComponents);
  expect(result2).toEqual(allComponents);
});

describe('hoc', () => {
  const hocMock1 = jest.fn();
  const hocMock2 = jest.fn();

  beforeEach(() => {
    hocMock1.mockClear();
    hocMock2.mockClear();
  });

  test('every component is ok', () => {
    const result = makeWidgetMap(allComponents, [hocMock1, hocMock2]);

    expect(hocMock1).toBeCalledTimes(2);
    expect(hocMock2).toBeCalledTimes(2);
    expect(Object.keys(result).length).toEqual(2);
  });

  test('component key is number should transformed to string', () => {
    const result = makeWidgetMap(
      { ...allComponents, 3: (): string => 'Number Component' },
      [hocMock1, hocMock2],
    );

    expect(hocMock1).toBeCalledTimes(3);
    expect(hocMock2).toBeCalledTimes(3);
    expect(Object.keys(result).length).toEqual(3);
  });
});
