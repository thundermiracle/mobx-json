import ValidatorJSManager from 'lib/ValidatorJSManager';

class Plugins {
  // default plugins
  private _validator = new ValidatorJSManager();

  // JsonForm will use widgetMap here if widget is not passed as prop
  private _widgetMap = {};

  get validator() {
    return this._validator;
  }

  set validator(validator) {
    this._validator = validator;
  }

  get widgetMap() {
    return this._widgetMap;
  }

  set widgetMap(widgetMap) {
    this._widgetMap = widgetMap;
  }
}

const plugins = new Plugins();

export default plugins;
