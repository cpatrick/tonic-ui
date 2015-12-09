# CoordinateControl

CoordinateControl is a React component which creates an
interactive coordinate control.

The widget is imported using the following:

```js
var CoordinateControl = require('tonic-ui/lib/react/widget/CoordinateControl');
```
## InitialState

```js
{
    x: 0,
    y: 0
}
```

## DefaultProperties

```js
{
    x: 0,
    y: 0,
    width: 50,
    height: 50
}
```

## updateCoordinates(coords)

Updates the coordinates in the control.
The arguement __coords__ is an object with the properties "x" and/or "y",
only the properties "x" and "y" will get passed to the state. If the values
for either of the properties are too large or small they will be
clamped to 1.0 or -1.0 respectively.

## coordinates()

Returns an object of the coordinates in the format `{x: val, y: val}`.

## Properties

- __x__: X coordinate of the control ranges between -1.0 and 1.0 inclusive.
- __y__: Y coordinate of the control, ranges between -1.0 and 1.0 inclusive.
- __width__: Width of the control in px.
- __height__: Height of the control in px.
