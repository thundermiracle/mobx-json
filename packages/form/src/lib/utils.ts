/* eslint-disable import/prefer-default-export */
function compose(...fns: Function[]) {
  return (...args: any[]) =>
    fns.reduceRight((prevBC, fn) => {
      if (!Array.isArray(prevBC)) prevBC = [prevBC];

      return fn(...prevBC);
    }, args);
}

export { compose };
