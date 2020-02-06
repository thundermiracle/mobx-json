import React from 'react';

import BasicFormJson from 'blueprints/basic-form.json';
import useSampleForm from 'views/hooks/useSampleForm';

const ModifyFormPage = () => {
  const contents = useSampleForm({
    blueprint: BasicFormJson,
    formUniqName: 'modifyForm',
  });

  return contents;
};

export default ModifyFormPage;
