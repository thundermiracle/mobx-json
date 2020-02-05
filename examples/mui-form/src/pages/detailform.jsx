import React from 'react';

import BasicDetailJson from 'blueprints/basic-detail.json';
import useSampleForm from 'views/hooks/useSampleForm';

const dataFromDb = {
  id: 'userid12345',
  name: 'Hello',
  password: 'World',
  sub1: 'Sub1111',
  sub2: 'Sub222',
  city: 'tokyo',
  birthday: '2012-03-24',
  birthtime: '01:10',
  agreement: true,
  sex: 0,
  interest: [2, 3],
  airplane: true,
};

// TODO: load data by click button
const DetailFormPage = () => {
  const form = useSampleForm({
    blueprint: BasicDetailJson,
    data: dataFromDb,
    showSubmit: false,
  });

  return form;
};

export default DetailFormPage;
