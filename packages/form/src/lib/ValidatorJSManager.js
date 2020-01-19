import Validator from 'validatorjs';

class ValidatorJSManager {
  Messages;

  setRules = rules => {
    if (rules != null && Array.isArray(rules)) {
      rules.forEach(({ name, callback, message }) => {
        Validator.register(name, callback, message);
      });
    }
  };

  setMessages = (customMessages, locale) => {
    const messages = Validator.getMessages(locale || 'en');
    this.Messages = { ...messages, ...customMessages };
  };

  validate = (value, rule) => {
    const validator = new Validator(value, rule, this.Messages);
    validator.check();

    return validator.errors;
  };
}

export default ValidatorJSManager;
