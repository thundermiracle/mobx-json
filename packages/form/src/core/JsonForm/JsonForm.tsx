import React from 'react';

import plugins from 'core/plugins';
import { isNativeWidget } from './lib/utils';
import NativeHtmlWidget from './widget/NativeHtmlWidget';
import withMobxAttrs from './hoc/withMobxAttrs';
import withFieldAttrs from './hoc/withFieldAttrs';

const renderAllFields = (
  fields: any,
  widgetMap: any,
  factoryProps: any,
): JSX.Element[] => {
  const allComponents = Object.keys(fields)
    .map(key => fields[key])
    .map(field => {
      const { attrs, settings, fields: innerFields } = field;
      const widget = settings.widget;
      let ObservableComponent;
      // set WrapperComponet to widget if it is not defined in mapper
      if (isNativeWidget(widget)) {
        ObservableComponent = NativeHtmlWidget;
      } else if (innerFields) {
        // no need mobx attrs for Container(Grid, Group?)
        ObservableComponent = withFieldAttrs(widgetMap[widget]);
      } else {
        ObservableComponent = withMobxAttrs(widgetMap[widget]);
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

interface Props {
  store?: any;
  fields?: any;
  onChange?: Function;
  widgetMap?: any;
}

const ReacbMobxJsonForm = ({
  store = {},
  fields,
  onChange,
  widgetMap = plugins.widgetMap,
  ...restProps
}: Props) => {
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
