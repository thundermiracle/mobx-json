import React from 'react';
import PropTypes from 'prop-types';

import { useMuiJsonForm } from '@mobx-json/mui-form';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import BasicFormJson from 'blueprints/basic-form.json';

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
const ModifyFormPage = () => {
  const { form: modifyForm, submitWithCheck } = useMuiJsonForm({
    blueprint: BasicFormJson,
    formUniqName: 'modifyForm',
    data: dataFromDb,
  });

  const handleSubmit = React.useCallback(() => {
    const data = submitWithCheck();
    console.log(data);
  }, [submitWithCheck]);

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>{modifyForm}</CardContent>
        <CardActions>
          <Button color="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

ModifyFormPage.propTypes = {};

export default ModifyFormPage;
