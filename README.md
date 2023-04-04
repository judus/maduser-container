# maduser-container

```js
const App = new Container({
    components: {
        some-arbitrary-name: {
            class: TheClassToUse,
            selector: '.some .selector .string',
            options: {
              any: 'options',
              you: 'want',
              to: 'inject'
            }
        },
        some-arbitrary-name: {
            class: TheClassToUse,
            selector: '.some .selector .string',
            options: {
              any: 'options',
              you: 'want',
              to: 'inject'
            }
        }
    }
});

App.initAll();
```
