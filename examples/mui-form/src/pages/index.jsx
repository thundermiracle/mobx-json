import React from 'react';
import PropTypes from 'prop-types';

import { useMuiJsonForm } from '@mobx-json/mui-form';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import BasicFormJson from 'blueprints/basic-form.json';
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

const IndexPage = props => {
  const { form: detailForm } = useMuiJsonForm({
    blueprint: BasicDetailJson,
    data: dataFromDb,
  });

  const { form: modifyForm, submitWithCheck } = useMuiJsonForm({
    blueprint: BasicFormJson,
    data: dataFromDb,
  });

  const {
    form: modifyForm2,
    submitWithCheck: submitWithCheck2,
  } = useMuiJsonForm({
    blueprint: BasicFormJson,
    data: dataFromDb,
  });

  const handleSubmit = React.useCallback(() => {
    const data = submitWithCheck();
    console.log(data);
  }, [submitWithCheck]);

  const handleSubmit2 = React.useCallback(() => {
    const data = submitWithCheck2();
    console.log(data);
  }, [submitWithCheck2]);

  return (
    <Container maxWidth="sm">
      {modifyForm}
      {detailForm}
      {modifyForm2}
      <Button color="primary" onClick={handleSubmit}>
        Login
      </Button>
      <Button color="primary" onClick={handleSubmit2}>
        Login2
      </Button>
    </Container>
  );
};

IndexPage.propTypes = {};

export default IndexPage;
