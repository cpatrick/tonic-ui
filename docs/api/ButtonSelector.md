# ButtonSelector

ButtonSelector is a React component which creates a list of button that let you
pick an object based on a provided list.

The widget is imported using the following:

```js
var ButtonSelector = require('tonic-ui/lib/react/widget/ButtonSelector');
```

This react component expect the following properties:

- list : List of objects that we should pick from.
- onChange: Callback function called when a button is clicked.

The list should be compose of objects that have a __name__ attribute.

The callback function should be defined as follow:

```js
function(idx, list) {
    // list: The list provided as input.
    // idx: The index of the object list.
}
```
