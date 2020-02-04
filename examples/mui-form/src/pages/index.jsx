import React from 'react';
import PropTypes from 'prop-types';

import { useMuiJsonForm } from '@mobx-json/mui-form';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import BasicFormJson from 'blueprints/basic-form.json';
import BasicFormOutlinedJson from 'blueprints/basic-form-outlined.json';
import BasicDetailJson from 'blueprints/basic-detail.json';
import { Card, CardContent, CardActions } from '@material-ui/core';

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
    formUniqName: 'modifyForm',
    data: dataFromDb,
  });

  const handleSubmit = React.useCallback(() => {
    const data = submitWithCheck();
    console.log(data);
  }, [submitWithCheck]);

  const {
    form: modifyFormOutlined,
    submitWithCheck: submitWithCheckOutlined,
  } = useMuiJsonForm({
    blueprint: BasicFormOutlinedJson,
    formUniqName: 'modifyFormOutlined',
    data: dataFromDb,
  });

  const handleSubmitOutlined = React.useCallback(() => {
    const data = submitWithCheckOutlined();
    console.log(data);
  }, [submitWithCheckOutlined]);

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>{modifyForm}</CardContent>
        {/* <CardActions>
          <Button color="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </CardActions> */}
      </Card>
      {detailForm}
      {modifyFormOutlined}
      <Button color="primary" onClick={handleSubmit}>
        Confirm
      </Button>
      <Button color="primary" onClick={handleSubmitOutlined} variant="outlined">
        ConfirmOutlined
      </Button>
    </Container>
  );
};

IndexPage.propTypes = {};

export default IndexPage;
