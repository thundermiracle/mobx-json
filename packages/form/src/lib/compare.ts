const compare = (
  compareFrom: string | number = '',
  compareTo: string | number = '',
  method: string,
): boolean => {
  switch (method) {
    case '=':
      // eslint-disable-next-line eqeqeq
      return compareFrom == compareTo;
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
