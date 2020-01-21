import { JsonFormStore } from '@mobx-json/form';
import LoginFormJson from './login-form.json';

const store = new JsonFormStore(LoginFormJson);

export default store;
