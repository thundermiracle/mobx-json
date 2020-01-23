import React from 'react';
import PropTypes from 'prop-types';

import { useMuiJsonForm } from '@mobx-json/mui-form';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import LoginFormJson from 'blueprints/login-form.json';

const dataFromDb = {
  name: 'Hello',
  password: 'World',
  sub1: 'Sub1111',
  sub2: 'Sub222',
};

const IndexPage = props => {
  const { form, onSubmit } = useMuiJsonForm({
    blueprint: LoginFormJson,
    data: dataFromDb,
  });

  const handleSubmit = React.useCallback(() => {
    const data = onSubmit();
    console.log(data);
  }, [onSubmit]);

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        {form}
      </Grid>
      <Button color="primary" onClick={handleSubmit}>
        Login
      </Button>
    </Container>
  );
};

IndexPage.propTypes = {};

export default IndexPage;
