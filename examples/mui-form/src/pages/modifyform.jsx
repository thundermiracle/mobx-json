import React from 'react';

import BasicFormJson from 'blueprints/basic-form.json';
import SampleForm from 'views/SampleForm/SampleForm';

const ModifyFormPage = () => {
  return <SampleForm blueprint={BasicFormJson} formUniqName="modifyForm" />;
};

export default ModifyFormPage;
