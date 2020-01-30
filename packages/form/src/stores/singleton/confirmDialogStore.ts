import { observable, action } from 'mobx';

import DialogStore from 'stores/DialogStore';

type ConfirmResolver = ((value: boolean) => void) | null;

class ConfirmDialogStore extends DialogStore {
  @observable
  dialogMessage = '';

  private _confirmResolver: ConfirmResolver = null;

  /**
   * display confirm dialog
   *
   * @param {*string} dialogMessage: [DEFAULT]Are you sure?
   */
  @action
  confirmDiscardChanges = (dialogMessage = ''): Promise<any> => {
    this.dialogMessage = dialogMessage || 'Are you sure?';

    return new Promise(resolve => {
      this.openDialog();
      this._confirmResolver = resolve;
    });
  };

  handleOk = (): void => {
    this.closeDialog();
    if (this._confirmResolver) {
      this._confirmResolver(true);
    }
  };

  handleCancel = (): void => {
    this.closeDialog();
    if (this._confirmResolver) {
      this._confirmResolver(false);
    }
  };
}

const store = new ConfirmDialogStore();

export default store;
