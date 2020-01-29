import Validator from 'validatorjs';

import { AnyObject } from '../core/JsonFormTypes';

class ValidatorJSManager {
  private _messages: any;

  setRules = (rules: any): void => {
    if (rules != null && Array.isArray(rules)) {
      rules.forEach(({ name, callback, message }) => {
        Validator.register(name, callback, message);
      });
    }
  };

  setMessages = (
    customMessages: object,
    locale: string | null | undefined,
  ): void => {
    const messages = Validator.getMessages(locale || 'en');
    this._messages = { ...messages, ...customMessages };
  };

  /**
   * return object of errors
   * { name: [errMsg1, errMsg2] }
   */
  validate = (value: any, rule: any): AnyObject => {
    const validator = new Validator(value, rule, this._messages);
    validator.check();

    return validator.errors.errors;
  };
}

export default ValidatorJSManager;
