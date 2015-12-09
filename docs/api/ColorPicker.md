# ColorPicker

ColorPicker is a React component which creates an
interactive color picker component.

The widget is imported using the following:

```js
var ColorPicker = require('tonic-ui/lib/react/widget/ColorPicker');
```
## InitialState

```js
{
    swatch: this.props.swatch,
    color: [0,0,0],
    preview: false,
    originalColor: [
    	this.props.color[0],
    	this.props.color[1],
    	this.props.color[2]
    ]
}
```

## DefaultProperties

```js
{
    color: [0,0,0],
    swatch: 'encoded/swatch'
}
```

## updateColor(color)

Updates the selected color. The color is an array [r, g, b] where each number is
between 0 and 255.

## updateSwatch(url)

Updates the URL of the color swatch image.

## Properties

- __color__: Initial color to use.
- __onChange__: Callback function to call when a new color is picked. The argument of the callback method will be a [r,g,b] color array.
