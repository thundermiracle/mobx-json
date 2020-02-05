import React from 'react';

import plugins from 'core/plugins';
import { isNativeWidget } from 'lib/utils';

import NativeHtmlWidget from './widget/NativeHtmlWidget';
import withMobxAttrs from './hoc/withMobxAttrs';
import withFieldAttrs from './hoc/withFieldAttrs';
import { filterFields } from './filters';

import { Fields, JsonForm } from '../JsonFormTypes';

const renderAllFields = (
  fields: Fields = {},
  widgetMap: any,
  factoryProps: any,
): JSX.Element[] => {
  const allComponents = filterFields(Object.values(fields))
    .map(field => {
      const { attrs, settings, fields: innerFields } = field;
      const widget = settings.widget;
      let ObservableComponent;
      // set WrapperComponet to widget if it is not defined in mapper
      if (isNativeWidget(widget)) {
        ObservableComponent = NativeHtmlWidget;
      } else if (widgetMap[widget]) {
        if (innerFields) {
          // no need mobx attrs for Container(Grid, Group?)
          ObservableComponent = withFieldAttrs(widgetMap[widget]);
        } else {
          ObservableComponent = withMobxAttrs(widgetMap[widget]);
        }
      } else {
        throw new Error(`widget: [${widget}] is not exist in widgetMap.`);
      }

      let innerComponents;
      if (innerFields) {
        // propagate props from parent's attrs to all children
        const { disabled } = attrs;
        let disabledProp;
        if (disabled != null) {
          disabledProp = { disabled };
        }
        innerComponents = renderAllFields(innerFields, widgetMap, {
          ...factoryProps,
          ...disabledProp,
        });
      }

      if (innerComponents) {
        return (
          <ObservableComponent key={attrs.name} {...field} {...factoryProps}>
            {innerComponents}
          </ObservableComponent>
        );
      }

      return (
        <ObservableComponent key={attrs.name} {...field} {...factoryProps} />
      );
    })
    .filter(comp => comp != null);

  return allComponents;
};

const ReacbMobxJsonForm: React.FC<JsonForm> = ({
  store = {},
  fields,
  onChange,
  widgetMap = plugins.widgetMap,
  ...restProps
}) => {
  // use store.OnFiledChange if onChange function is not passed
  const extraProps = {
    ...restProps,
    onChange: onChange || store.onFieldChange,
  };

  // use store.fields if fields is not passed
  const allComponents = renderAllFields(
    fields || store.fields,
    widgetMap,
    extraProps,
  );
  return <>{allComponents}</>;
};

export default ReacbMobxJsonForm;
