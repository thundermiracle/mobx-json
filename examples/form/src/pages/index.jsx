import React from 'react';
import PropTypes from 'prop-types';

import { JsonForm } from '@mobx-json/form';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import store from '../client/stores/LoginFormStore';
import widgetMap from '../client/views/widgetMap';

const IndexPage = props => {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <JsonForm
          fields={store.fields}
          widgetMap={widgetMap}
          onChange={store.onFieldChangeCheckAll}
        />
      </Grid>
      <Button onClick={store.checkAllOnSubmit} color="primary">
        Login
      </Button>
    </Container>
  );
};

IndexPage.propTypes = {};

export default IndexPage;
