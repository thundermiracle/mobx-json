import ValidatorJSManager from 'lib/ValidatorJSManager';

class Plugins {
  private _validator: any;

  get validator() {
    return this._validator;
  }

  set validator(validator) {
    this._validator = validator;
  }
}

const plugins = new Plugins();

// default plugins
plugins.validator = new ValidatorJSManager();

export default plugins;
