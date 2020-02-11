import { format, differenceInYears } from 'date-fns';

import { isDateStr, isNilOrEmpty } from './utils';

interface FormattersClass {
  [key: string]: any;
}

/**
 * return '' or -1 if parsing failed to keep Component in controlled
 */
class Formatters {
  date = (dateStr: string, template: string): string => {
    if (!isDateStr(dateStr)) {
      return '';
    }

    if (isNilOrEmpty(template)) {
      return dateStr;
    }

    return format(new Date(dateStr), template);
  };

  time = (timeStr: string, template: string): string => {
    const dateStr = `2020-01-01 ${timeStr}`;

    if (!isDateStr(dateStr)) {
      return '';
    }

    if (isNilOrEmpty(template)) {
      return timeStr;
    }

    return format(new Date(dateStr), template);
  };

  age = (birthdayStr: string, template?: string): number | string => {
    const ageNum = isDateStr(birthdayStr)
      ? differenceInYears(new Date(), new Date(birthdayStr))
      : 0;

    return template ? this._tmpl(ageNum, template) : ageNum;
  };

  number = (numStr: string, template?: string): number | string => {
    const num = isNaN(+numStr) ? -1 : +numStr;

    return template ? this._tmpl(num, template) : num;
  };

  digit = (numStr: string, template?: string): string => {
    const parsed = this.number(numStr);

    if (parsed === -1) {
      return '';
    }

    const digitStr = parsed.toLocaleString();

    return template ? this._tmpl(digitStr, template) : digitStr;
  };

  private _tmpl = (data: any, template: string): string => {
    return template.replace(/{(.*?)}/g, data);
  };
}

const formatters: FormattersClass = new Formatters();

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
