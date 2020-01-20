import { JsonFormStore } from '@mobx-json/form';
import LoginFormJson from './login-form.json';

const store = new JsonFormStore();
store.initFieldsByJsonBlueprint(LoginFormJson);

export default store;
