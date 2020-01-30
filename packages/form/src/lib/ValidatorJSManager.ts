import Validator from 'validatorjs';

import {
  AnyObject,
  ValidatorRule,
  ValidatorJSManager as ValidatorJSManagerClass,
} from '../core/JsonFormTypes';

class ValidatorJSManager implements ValidatorJSManagerClass {
  private _messages: AnyObject = {};

  setRules = (rules: ValidatorRule[]): void => {
    if (rules != null && Array.isArray(rules)) {
      rules.forEach(({ name, callback, message }) => {
        Validator.register(name, callback, message);
      });
    }
  };

  setMessages = (
    customMessages: AnyObject,
    locale: string | null | undefined,
  ): void => {
    const messages = Validator.getMessages(locale || 'en');
    this._messages = { ...messages, ...customMessages };
  };

  /**
   * return object of errors
   * { name: [errMsg1, errMsg2] }
   */
  validate = (value: AnyObject, valueRule: AnyObject): AnyObject => {
    const validator = new Validator(value, valueRule, this._messages);
    validator.check();

    return validator.errors.errors;
  };
}

export default ValidatorJSManager;
