import React from 'react';
import PropTypes from 'prop-types';

import { JsonForm } from '@mobx-json/form';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import store from '../client/stores/LoginFormStore';
import GridContainer from '../client/components/GridContainer';

const IndexPage = props => {
  return (
    <Container maxWidth="sm">
      <GridContainer>
        <JsonForm store={store} />
      </GridContainer>
      <Button onClick={store.checkAllOnSubmit} color="primary">
        Login
      </Button>
    </Container>
  );
};

IndexPage.propTypes = {};

export default IndexPage;
