import { observable, action } from 'mobx';

class DialogStore {
  @observable
  openDialogFlag = false;

  @action
  openDialog = () => {
    this.openDialogFlag = true;
  };

  @action
  closeDialog = () => {
    this.openDialogFlag = false;
  };
}

export default DialogStore;
