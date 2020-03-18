import map from 'ramda/src/map';
import isNil from 'ramda/src/isNil';
import anyPass from 'ramda/src/anyPass';
import isEmpty from 'ramda/src/isEmpty';
import pluck from 'ramda/src/pluck';
import curry from 'ramda/src/curry';
import zipObj from 'ramda/src/zipObj';
import repeat from 'ramda/src/repeat';
import propEq from 'ramda/src/propEq';
import find from 'ramda/src/find';
import pickBy from 'ramda/src/pickBy';
import complement from 'ramda/src/complement';

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

/**
 * [], '', null, undefined -> true
 */
const isNilOrEmpty = anyPass([isNil, isEmpty]);

/**
 * '2020-01-28' -> true
 * 'abc' -> false
 * '' -> false
 */
const isDateStr = (dtStr: string): boolean => {
  if (isNilOrEmpty(dtStr)) {
    return false;
  }

  return new Date(dtStr).toString() !== 'Invalid Date';
};

/**
 * ('a', 2, [{a: 1}, {a: 2}, {a: 3}]) -> {a: 2}
 * ('a', 4, [{a: 1}, {a: 2}, {a: 3}]) -> undefined
 */
const findByPropVal = (
  propKey: string,
  propVal: string | number,
  objArr: any[],
): object | undefined => {
  return find(propEq(propKey, propVal), objArr);
};

/**
 * line1\nline2\r\nline3 -> line1<br />line2<br />line3
 */
const nl2br = (
  str: string | number | boolean | undefined,
  br = '<br />',
): string => {
  if (str == null) {
    return '';
  }

  if (typeof str !== 'string') {
    str = str.toString();
  }

  let result = str.replace(/\r\n/g, br);
  result = result.replace(/(\n|\r)/g, br);
  return result;
};

/**
 * line1\nline2\r\nline3 -> ['line1', 'line2', 'line3']
 * line1 -> ['line1']
 */
const nl2Arr = (str?: string | number | boolean): string[] => {
  const tagName = `<tag_json_form_mui_form_special_key_1>`;
  const result = nl2br(str, tagName).split(tagName);

  return result;
};

/**
 * { a: undefined, b: null, c: 1, d: '2'} -> { c: 1, d: '2'}
 */
const rmNilProps = pickBy(complement(isNil));

export {
  propAll,
  valsToString,
  zipObjArrWithVal,
  isNilOrEmpty,
  isDateStr,
  findByPropVal,
  nl2br,
  nl2Arr,
  rmNilProps,
};
