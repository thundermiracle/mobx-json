import React from 'react';

import BasicDetailJson from 'blueprints/basic-detail.json';
import SampleForm from 'views/SampleForm';

const DetailFormPage = () => {
  return <SampleForm blueprint={BasicDetailJson} showSubmit={false} />;
};

export default DetailFormPage;
