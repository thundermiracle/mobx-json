import ValidatorJSManager from '../lib/ValidatorJSManager';
import {
  AnyObject,
  ValidatorJSManager as ValidatorJSManagerClass,
} from './JsonFormTypes';

class Plugins {
  // default plugins
  private _validator: ValidatorJSManagerClass = new ValidatorJSManager();

  // JsonForm will use widgetMap here if widget is not passed as prop
  private _widgetMap: AnyObject = {};

  // JsonForm will use iconsMap here if icon is set in json definition
  private _iconsMap: AnyObject = {};

  /*
   * itemsSource in Json definition
   * exp: JSON:  "itemsSource": "Sex"
   *      itemsSource: { Sex: [ {label: "Male", value: 0}, {label: "Female", value 1} ] }
   *     ->
   *     JsonFormStore.fields Sex: [ {label: "Male", value: 0}, {label: "Female", value 1} ]
   */
  private _itemsSource = {};

  get validator(): ValidatorJSManagerClass {
    return this._validator;
  }

  set validator(validator) {
    this._validator = validator;
  }

  get widgetMap(): AnyObject {
    return this._widgetMap;
  }

  set widgetMap(widgetMap) {
    this._widgetMap = widgetMap;
  }

  get itemsSource(): AnyObject {
    return this._itemsSource;
  }

  set itemsSource(itemsSource) {
    this._itemsSource = itemsSource;
  }

  get iconsMap(): AnyObject {
    return this._iconsMap;
  }

  set iconsMap(iconsMap) {
    this._iconsMap = iconsMap;
  }
}

const plugins = new Plugins();

export default plugins;
