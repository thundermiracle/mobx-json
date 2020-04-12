import React from 'react';
import { Button, Dialog } from '@material-ui/core';

import SelectTest from '@mobx-json/mui-form/dist/components/Select';

const TestPage = props => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Open</Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <SelectTest items={[{ value: 1 }, { value: 2 }]} />
      </Dialog>
    </>
  );
};

export default TestPage;
