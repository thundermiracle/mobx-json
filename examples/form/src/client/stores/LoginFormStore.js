import { JsonFormStore } from '@mobx-json/form';
import LoginFormJson from './login-form.json';

class LoginFormStore extends JsonFormStore {
  constructor() {
    super();
    this.initFieldsByJsonBlueprint(LoginFormJson);
  }
}

const store = new LoginFormStore();

export default store;
