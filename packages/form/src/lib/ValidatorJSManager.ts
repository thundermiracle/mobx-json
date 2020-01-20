import Validator from 'validatorjs';

class ValidatorJSManager {
  private _messages: any;

  setRules = (rules: any) => {
    if (rules != null && Array.isArray(rules)) {
      rules.forEach(({ name, callback, message }) => {
        Validator.register(name, callback, message);
      });
    }
  };

  setMessages = (customMessages: object, locale: string | null | undefined) => {
    const messages = Validator.getMessages(locale || 'en');
    this._messages = { ...messages, ...customMessages };
  };

  validate = (value: any, rule: any) => {
    const validator = new Validator(value, rule, this._messages);
    validator.check();

    return validator.errors;
  };
}

export default ValidatorJSManager;
