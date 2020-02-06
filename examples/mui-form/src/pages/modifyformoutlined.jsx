import React from 'react';

import BasicFormOutlinedJson from 'blueprints/basic-form-outlined.json';
import useSampleForm from 'views/hooks/useSampleForm';

// TODO: load data by clicking button
const ModifyFormOutlinedPage = () => {
  const form = useSampleForm({
    blueprint: BasicFormOutlinedJson,
    formUniqName: 'modifyFormOutlined',
  });

  return form;
};

export default ModifyFormOutlinedPage;
