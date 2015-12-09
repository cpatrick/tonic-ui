# ImageRenderer

ImageRenderer is a React component made to be used by others.
The widget creates an interactive component which lets you render an image or a
canvas while letting the user zoom and pan on it.

The widget is imported using the following:

```js
var ImageRenderer = require('tonic-ui/lib/react/renderer/Image');
```

## InitialState

```js
{
    width: 200,
    height: 200
}
```

## DefaultProperties

```js
{
    minZoom: 0.1,
    maxZoom: 10,
    sensitivity: 1000,
    crosshairColor: '#000',
    modifiers: [0, 2],
    pressRadius: 50
}
```

## updateDimensions()

Updates canvas size based on container size.

## renderImage({url: imageURL})

Renders an image into the renderer.

## renderCanvas({...})

Renders a canvas into the renderer.

The expected data structure is as follows:

```js
{
    canvas: DOMElement,
    imageData: ImageDataFromCanvas,
    area: [0, 0, width, height],
    outputSize: [width, height]
}
```

## resetCamera()

Resets the zoom level and center so the image fits within the space available.

## Properties

- __listener__: (Optional) Listener map similar to the one you can get from a QueryDataModel.
