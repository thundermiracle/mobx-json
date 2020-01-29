import { observable, action } from 'mobx';

class DialogStore {
  @observable
  openDialogFlag = false;

  @action
  openDialog = (): void => {
    this.openDialogFlag = true;
  };

  @action
  closeDialog = (): void => {
    this.openDialogFlag = false;
  };
}

export default DialogStore;
