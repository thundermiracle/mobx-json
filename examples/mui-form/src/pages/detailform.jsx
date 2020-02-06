import React from 'react';

import BasicDetailJson from 'blueprints/basic-detail.json';
import useSampleForm from 'views/hooks/useSampleForm';

const DetailFormPage = () => {
  const form = useSampleForm({
    blueprint: BasicDetailJson,
    showSubmit: false,
  });

  return form;
};

export default DetailFormPage;
