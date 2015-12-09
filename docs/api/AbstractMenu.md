# AbstractMenu

AbstractMenu is a React component which creates an ImageRenderer with a collapsable menu on top of it.
It expects a QueryDataModel to be used as a menu toolbar to provide control
for the animations.

The children of this component will be inserted within a collapsable menu. They
should be used to control the QueryDataModel more deeply as well as any custom image builders.

The widget is imported using the following:

```js
var AbstractMenu = require('tonic-ui/lib/react/viewer/AbstractMenu');
```

## togglePanel()

Toggles the visibility of the control menu.

## resetCamera()

Resets the camera on the ImageRenderer if the component is mounted.

## play()

Starts animating the __QueryDataModel__.

## stop()

Stops any running animations on the __QueryDataModel__.

## updateSpeed()

Changes the animation speed by looping over the array
__this.state.speed__ which has a default set of values of [20, 50, 100, 200, 500].

## InitialState

```js
{
    collapsed: true,
    speedIdx: 0,
    speeds: [ 20, 50, 100, 200, 500 ]
}
```

## Properties

- __queryDataModel__: (Required) The instance of QueryDataModel to work with.
- __children__: (Required) HTML or React content that should be inserted inside the menu.
- __mouseListener__: (Optional) Map of mouse handling callback. If not provided, the queryDataModel.getTonicMouseListener() will be used.
- __imageBuilder__: (Optional) Instance of an ImageBuilder. If any, the component will attach a listener using the onImageReady() method. If none provided, it will listen to the queryDataModel.onDataChange() for for data called 'image' and renders it.
