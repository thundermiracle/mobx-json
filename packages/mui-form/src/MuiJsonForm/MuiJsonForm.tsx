import React from 'react';
import { JsonForm, JsonFormStore } from '@mobx-json/form';

interface MuiJsonFormProps {
  blueprint: any;
}

const MuiJsonForm = ({ blueprint }: MuiJsonFormProps) => {
  const store = React.useMemo(() => {
    return new JsonFormStore(blueprint);
  }, [blueprint]);

  return <JsonForm store={store} />;
};

export default MuiJsonForm;
