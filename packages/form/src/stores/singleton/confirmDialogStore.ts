import { observable, action } from 'mobx';

import DialogStore from 'stores/DialogStore';

class ConfirmDialogStore extends DialogStore {
  @observable
  dialogMessage: string = '';

  private _confirmResolver: any;

  /**
   * display confirm dialog
   *
   * @param {*string} dialogMessage: [DEFAULT]Are you sure?
   */
  @action
  confirmDiscardChanges = (dialogMessage = '') => {
    this.dialogMessage = dialogMessage || 'Are you sure?';

    return new Promise(resolve => {
      this.openDialog();
      this._confirmResolver = resolve;
    });
  };

  handleOk = () => {
    this.closeDialog();
    this._confirmResolver(true);
  };

  handleCancel = () => {
    this.closeDialog();
    if (this._confirmResolver) {
      this._confirmResolver(false);
    }
  };
}

const store = new ConfirmDialogStore();

export default store;
