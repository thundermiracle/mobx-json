import React from 'react';
import PropTypes from 'prop-types';

import { useMuiJsonForm } from '@mobx-json/mui-form';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import BasicFormOutlinedJson from 'blueprints/basic-form-outlined.json';

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
        <CardContent>{modifyFormOutlined}</CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={handleSubmitOutlined}
            variant="outlined"
          >
            ConfirmOutlined
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

ModifyFormOutlinedPage.propTypes = {};

export default ModifyFormOutlinedPage;
