import React from 'react';

import BasicFormOutlinedJson from 'blueprints/basic-form-outlined.json';
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

// TODO: load data by clicking button
const ModifyFormOutlinedPage = () => {
  const form = useSampleForm({
    blueprint: BasicFormOutlinedJson,
    formUniqName: 'modifyFormOutlined',
    data: dataFromDb,
  });

  return form;
};

export default ModifyFormOutlinedPage;
