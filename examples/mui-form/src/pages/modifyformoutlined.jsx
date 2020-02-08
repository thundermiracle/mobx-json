import React from 'react';

import BasicFormOutlinedJson from 'blueprints/basic-form-outlined.json';
import SampleForm from 'views/SampleForm/SampleForm';

const ModifyFormOutlinedPage = () => {
  return (
    <SampleForm
      blueprint={BasicFormOutlinedJson}
      formUniqName="modifyFormOutlined"
    />
  );
};

export default ModifyFormOutlinedPage;
