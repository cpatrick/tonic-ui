# NumberSliderControl

NumberSliderControl is a React component which creates a
control with a slider and a corresponding number input.

The widget is imported using the following:

```js
var NumberSliderControl = require('tonic-ui/lib/react/widget/NumberSliderControl');
```

## DefaultProperties

```js
{
	val: 50,
	max: 100,
	min:0,
	step: 1
}
```

## updateValue(newVal)

Updates the value of the component to newVal, will clamp the value if newVal is too large or small.

## Properties

All properties are optional.

- __onChange(event)__: Callback function when component's value changes, if _name_ is
	defined in properties the passed event will have _e.target.name_, useful forms.
	useful for forms that have multiple NumberSliderControls.
- __name__: Name to pass to e.target.name in _onChange_ callback.
- __val__: Value of the slider and number input.
- __max__: Maximum value.
- __min__: Minimum value.
- __step__: Value to increment or decrement _val_ by.

