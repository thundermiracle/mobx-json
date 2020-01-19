import { observable } from 'mobx';

export default class LoadingStore {
  @observable pageLoading = true;
  @observable dataLoading = true;
}
