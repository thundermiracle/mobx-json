/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { useMuiJsonForm } from '@mobx-json/mui-form';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const useSampleForm = ({
  blueprint,
  formUniqName,
  data,
  showSubmit = true,
}) => {
  const { form: modifyForm, submitWithCheck } = useMuiJsonForm({
    blueprint,
    formUniqName,
    data,
  });

  const handleSubmit = React.useCallback(() => {
    const submitData = submitWithCheck();
    console.log(submitData);
  }, [submitWithCheck]);

  return (
    <Card>
      <CardContent>{modifyForm}</CardContent>
      {showSubmit ? (
        <CardActions>
          <Button color="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default useSampleForm;
