# LookupTableWidget

LookupTableWidget is a React component made to be used by others.
The widget creates an interactive component which let you edit a LookupTable
using also the ColorPicker.

The widget can be imported using the following way:

```js
var LookupTableWidget = require('tonic-ui/lib/react/widget/LookupTable');
```

## InitialState

```js
{
    mode: 'none',
    min: '0',
    max: '0',
    activePreset: this.props.lut.getPresets()[0],
    rangeEditing: false,
    currentControlPointIndex: 0,
    internal_lut: false
}
```

## toggleEditMode()

Toggles the visualization of the scalar bar and edit mode.

## togglePresetMode()

Toggles the visualization of the presets.

## resetRange()

Resets the scalar range of the lookupTable to use the __originalRange__ provided as property.

## nextPreset()

In Preset Mode, this will show the next preset within the list.

## previousPreset()

In Preset Mode, this will show the previous preset within the list.

## Properties

- __lut__: Expects a LookupTable instance that you want to render and edit.
- __originalRange__: Expects the data range to use for the lookup table in case of reset.
- __inverse__: Expects a boolean. If true, the control point will be displayed using the inverse of the actual color. Otherwise, a white or black line will be used depending on the best contrast.
- __lutManager__: Expects a reference to the lookup table manager to use.

