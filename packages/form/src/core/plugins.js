import ValidatorJSManager from 'lib/ValidatorJSManager';

const privateData = {
  validator: null,
};

class Plugins {
  get validator() {
    return privateData.validator;
  }

  set validator(validator) {
    privateData.validator = validator;
  }
}

const plugins = new Plugins();

// default plugins
plugins.validator = new ValidatorJSManager();

export default plugins;
