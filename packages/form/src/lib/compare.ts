const compare = (
  compareFrom: string | number = '',
  compareTo: string | number = '',
  method: string,
): boolean => {
  switch (method) {
    case '=':
      return (
        compareFrom === compareTo ||
        compareFrom.toString() === compareTo.toString()
      );
    case '>':
      return compareFrom > compareTo;
    case '<':
      return compareFrom < compareTo;
    case '>=':
      return compareFrom >= compareTo;
    case '<=':
      return compareFrom <= compareTo;
    case '<>':
    default:
      return compareFrom !== compareTo;
  }
};

export default compare;
