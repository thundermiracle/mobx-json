# mobx-json (The package is under development and not published)

[![npm version](https://badge.fury.io/js/%40mobx-json%2Fmui-form.svg)](https://badge.fury.io/js/%40mobx-json%2Fmui-form)
[![dependencies Status](https://david-dm.org/thundermiracle/mobx-json/status.svg?path=packages/mobx-json-mui-form)](https://david-dm.org/thundermiracle/mobx-json?path=mobx-json-mui-form)
[![devDependencies Status](https://david-dm.org/thundermiracle/mobx-json/dev-status.svg)](https://david-dm.org/thundermiracle/mobx-json?type=dev)
[![CircleCI](https://img.shields.io/circleci/build/github/thundermiracle/mobx-json/master)](https://circleci.com/gh/thundermiracle/mobx-json)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b9f18e47-19f6-4bd7-b493-92c2099c72dc/deploy-status)](https://app.netlify.com/sites/mobx-json/deploys)

The simplest way to manage your form in React.

State management is charged by mobx, but you can use the materia-ui wrapped one without any knowledge of it.

You can check some examples here: [https://mobx-json.netlify.com](https://mobx-json.netlify.com)

<!-- ## Installation (NOT Available)

```shell
npm i -S @mobx-json/mui-form
``` -->

## Usage of @mobx-json/mui-form

1. Define your form in JSON or javascript.

    ```json
    {
      "fields": [
        {
          "settings": {
            "widget": "TextField",
            "rule": "required|min:3"
          },
          "attrs": {
            "name": "id",
            "label": "Use Id",
            "placeholder": "input your user id"
          }
        },
        {
          "settings": {
            "widget": "Password",
            "rule": "required|min:8"
          },
          "attrs": {
            "name": "password",
            "label": "Password",
            "placeholder": "at least 8 chars"
          }
        }
      ]
    }
    ```

1. Create the form

    ```js
    import { useMuiJsonForm } from '@mobx-json/form';
    import LoginFormJson from './blueprints/login-form.json';

    const IndexPage = props => {
      const { form, submitWithCheck } = useMuiJsonForm({
        blueprint: LoginFormJson,
      });

      const handleSubmit = React.useCallback(async () => {
        const data = submitWithCheck();
        if (data) {
          await tryLogin(data);
        }
      }, [submitWithCheck]);

      // the following one is material-ui, you can use native ones as well
      return (
        <Container maxWidth="xs">
          <Card>
            <CardContent>{form}</CardContent>
            <CardActions>
              <Button color="primary" onClick={handleSubmit}>
                LOGIN
              </Button>
            </CardActions>
          </Card>
        </Container>
      );
    }
    ```

1. Display

    ![simple](./screenshots/simple.png)

## A more useful sample

[./examples/mui-form](./examples/mui-form)
