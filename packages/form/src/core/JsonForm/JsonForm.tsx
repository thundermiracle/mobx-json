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
      const {
        attrs: { extraProps, ...restAttrs },
        settings,
        fields: innerFields,
      } = field;
      // combine extraProps to attrs
      const attrs = { ...restAttrs, ...extraProps };

      const widget = settings.widget;
      let ObservableComponent;
      // set WrapperComponet to widget if it is not defined in mapper
      if (isNativeWidget(widget)) {
        ObservableComponent = withFieldAttrs(NativeHtmlWidget as any);
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
        innerComponents = renderAllFields(innerFields, widgetMap, factoryProps);
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

const ReactMobxJsonForm: React.FC<JsonForm> = ({
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

export default ReactMobxJsonForm;
