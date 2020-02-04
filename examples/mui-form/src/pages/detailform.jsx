import React from 'react';
import PropTypes from 'prop-types';

import { useMuiJsonForm } from '@mobx-json/mui-form';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import BasicDetailJson from 'blueprints/basic-detail.json';

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
  const { form: detailForm } = useMuiJsonForm({
    blueprint: BasicDetailJson,
    data: dataFromDb,
  });

  return (
    <Container maxWidth="md">
      <Card>{detailForm}</Card>
    </Container>
  );
};

DetailFormPage.propTypes = {};

export default DetailFormPage;
