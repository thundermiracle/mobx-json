import { transduce, filter, complement, isNil, isEmpty, anyPass } from 'ramda';

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
    fns.reduceRight((prevBC, fn) => {
      if (!Array.isArray(prevBC)) prevBC = [prevBC];

      return fn(...prevBC);
    }, args);
}

const isNotNil = complement(isNil);

const isNilOrEmpty = anyPass([isNil, isEmpty]);

const isNotNilOrEmpty = complement(isNilOrEmpty);

export {
  transduce,
  filter,
  compose,
  isNativeWidget,
  listCombiner,
  isNotNil,
  isNilOrEmpty,
  isNotNilOrEmpty,
};
