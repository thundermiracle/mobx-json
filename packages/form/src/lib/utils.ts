import transduce from 'ramda/src/transduce';
import filter from 'ramda/src/filter';
import complement from 'ramda/src/complement';
import isNil from 'ramda/src/isNil';
import isEmpty from 'ramda/src/isEmpty';
import anyPass from 'ramda/src/anyPass';

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
