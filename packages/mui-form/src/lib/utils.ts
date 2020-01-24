import { map, pick, prop, pluck, curry, zipObj, repeat } from 'ramda';

/**
 * ('a', [{ a: 1, b: 2}, { a: 3, b: 4} ])  => [ 1, 3 ]
 */
const propAll = curry((key: string, objArr: any[]): any[] => {
  return pluck(key)(objArr);
});

/**
 * [ 1, 2, 3 ] => [ '1', '2', '3' ]
 */
const valsToString = (valArr: string[] | number[] | boolean[]): string[] => {
  return map(val => val.toString(), valArr);
};

/**
 * (true, ['a', 'b', 'c']) => {a: true, b: true, c: true}
 */
const zipObjArrWithVal = curry((val: any, arr: string[]) => {
  return zipObj(arr, repeat(val, arr.length));
});

export { propAll, valsToString, zipObjArrWithVal };
