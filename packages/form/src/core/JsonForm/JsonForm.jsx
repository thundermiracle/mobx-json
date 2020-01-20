import React from 'react';
import PropTypes from 'prop-types';

import NativeHtmlWidget from './widget/NativeHtmlWidget';
import withMobxAttrs from './hoc/withMobxAttrs';

const renderAllFields = (fields, widgetMap, factoryProps) => {
  const allComponents = Object.keys(fields)
    .map(key => fields[key])
    .map(field => {
      const { attrs, settings, fields: innerFields } = field;
      const widget = settings.widget;
      let ObservableComponent;
      // set WrapperComponet to widget if it is not defined in mapper
      if (!widgetMap[widget]) {
        ObservableComponent = NativeHtmlWidget;
      } else if (innerFields) {
        // no need mobx attrs for Container(Grid, Group?)
        ObservableComponent = widgetMap[widget];
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

const ReacbMobxJsonForm = props => {
  const { fields, widgetMap, ...restProps } = props;
  const allComponents = renderAllFields(fields, widgetMap, restProps);
  return allComponents;
};

ReacbMobxJsonForm.propTypes = {
  fields: PropTypes.object.isRequired,
  widgetMap: PropTypes.object,
};

ReacbMobxJsonForm.defaultProps = {
  widgetMap: {},
};

export default ReacbMobxJsonForm;
