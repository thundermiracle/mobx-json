# mobx-json (The package is under development and not published)

The simplest way to manage your form in React.

State management is charged by mobx, but you can use the materia-ui wrapped one without any knowledge of mobx.

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
