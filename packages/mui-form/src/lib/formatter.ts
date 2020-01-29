import { format, differenceInYears } from 'date-fns';

import { isDateStr, isNilOrEmpty } from './utils';

interface Formatters {
  [key: string]: any;
}

/**
 * return '' or -1 if parsing failed to keep Component in controlled
 */
const formatters: Formatters = {
  date(dateStr: string, template: string): string {
    if (!isDateStr(dateStr)) {
      return '';
    }

    if (isNilOrEmpty(template)) {
      return dateStr;
    }

    return format(new Date(dateStr), template);
  },

  time(timeStr: string, template: string): string {
    const dateStr = `2020-01-01 ${timeStr}`;

    if (!isDateStr(dateStr)) {
      return '';
    }

    if (isNilOrEmpty(template)) {
      return timeStr;
    }

    return format(new Date(dateStr), template);
  },

  age(birthdayStr: string): number {
    if (!isDateStr(birthdayStr)) {
      return -1;
    }

    return differenceInYears(new Date(birthdayStr), new Date());
  },

  number(numStr: string): number {
    return isNaN(+numStr) ? -1 : +numStr;
  },

  digit(numStr: string): string {
    const parsed = this.number(numStr);

    if (parsed === -1) {
      return '';
    }

    return parsed.toLocaleString();
  },
};

export default (
  strBef: string,
  type: string,
  template?: string,
): string | number => {
  const formatFunc = formatters[type];
  if (formatFunc == null) {
    return strBef;
  }

  return formatFunc(strBef, template);
};
