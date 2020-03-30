import {
  transduce,
  filter,
  complement,
  isNil,
  isEmpty,
  anyPass,
  find,
  propEq,
} from 'ramda';

function isNativeWidget(widgetName: string): boolean {
  return /^[a-z]/.test(widgetName);
}

// use impure combiner to speed up
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function listCombiner(list: any[], val: any): any[] {
  list.push(val);
  return list;
}

// use self-made compose to avoid typescript error
function compose(...fns: Function[]) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return (...args: any[]) =>
    fns.reduceRight((prevBC: any, fn: any) => {
      if (!Array.isArray(prevBC)) prevBC = [prevBC];

      return fn(...prevBC);
    }, args);
}

const isNotNil = complement(isNil);

const isNilOrEmpty = anyPass([isNil, isEmpty]);

const isNotNilOrEmpty = complement(isNilOrEmpty);

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
function findByPropVal<T>(
  propKey: string,
  propVal: string | number,
  objArr: T[],
): T | undefined {
  return find<T>(propEq(propKey, propVal) as any, objArr);
}

export {
  transduce,
  filter,
  compose,
  isNativeWidget,
  listCombiner,
  isNotNil,
  isNilOrEmpty,
  isNotNilOrEmpty,
  isDateStr,
  findByPropVal,
};
