import ValidatorJSManager from '../lib/ValidatorJSManager';

class Plugins {
  // default plugins
  private _validator = new ValidatorJSManager();

  // JsonForm will use widgetMap here if widget is not passed as prop
  private _widgetMap = {};

  /*
   * itemsSource in Json definition
   * exp: JSON:  "itemsSource": "Sex"
   *      itemsSource: { Sex: [ {label: "Male", value: 0}, {label: "Female", value 1} ] }
   *     ->
   *     JsonFormStore.fields Sex: [ {label: "Male", value: 0}, {label: "Female", value 1} ]
   */
  private _itemsSource = {};

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

  get itemsSource() {
    return this._itemsSource;
  }

  set itemsSource(itemsSource) {
    this._itemsSource = itemsSource;
  }
}

const plugins = new Plugins();

export default plugins;
