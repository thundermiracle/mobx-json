import React from 'react';

import BasicFormJson from 'blueprints/compute-rule.json';
import SampleForm from 'views/SampleForm/SampleForm';

const ComputeRulePage = () => {
  return <SampleForm blueprint={BasicFormJson} />;
};

export default ComputeRulePage;
