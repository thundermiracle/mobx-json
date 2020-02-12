import { listCombiner } from 'lib/utils';

test('affect input list, input array is empty', () => {
  const inputArr: any = [];
  const result = listCombiner(inputArr, 'a');

  expect(result).toEqual(['a']);
  // input array is affected as well
  expect(inputArr).toEqual(result);
});

test('affect input list, input array contains element', () => {
  const inputArr: any = ['c'];
  const result = listCombiner(inputArr, 'a');

  expect(result).toEqual(['c', 'a']);
  // input array is affected as well
  expect(inputArr).toEqual(result);
});
