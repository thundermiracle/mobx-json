import { observable, action } from 'mobx';

import LoadingStore from './LoadingStore';

const DialogStoreMixin = superclass =>
  class extends (superclass || LoadingStore) {
    @observable openDialogFlag = false;

    @action
    openDialog = () => {
      this.openDialogFlag = true;
    };

    @action
    closeDialog = () => {
      this.openDialogFlag = false;
    };
  };

export default DialogStoreMixin;
