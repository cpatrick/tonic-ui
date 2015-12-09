---
layout: docs
title: Lookup Table
permalink: /docs/LookupTable/
prev_section: CoordinateControl
next_section: NumberSliderControl
repo_path: /docs/guides/widgets/LookupTable/lookupTable.md
---

# Introduction

The Lookup Table Widget allow to show and edit a of Lookup Table instance.

# Component styles

```
.LookupTableWidget {
    min-width: 5em;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    display: flex;
}

.LookupTableWidget__line {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 1.5em;
}

.LookupTableWidget__line > .LookupTableWidget__button {
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    text-align: center;
}

.LookupTableWidget__line > .LookupTableWidget__label {
    flex: 1;
    white-space: nowrap;
    font-weight: bold;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    text-align: center;
}

.LookupTableWidget__button {
    cursor: pointer;
    flex: none;
    width: 1.5em;
}

.LookupTableWidget__canvas {
    width: calc(100% - 3em);
    height: 1.5em;
}

.LookupTableWidget__range {
    display: none;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: stretch;
}

.LookupTableWidget__range > input {
    flex: 1;
}

.LookupTableWidget__range > .LookupTableWidget__button {
    flex: none;
}

.LookupTableWidget__editContent {
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    display: none;
}

.LookupTableWidget__presets {
    display: none;
}

.LookupTableWidget__preset {
    flex: 1;

    margin-top: 5px;
    margin-bottom: 5px;

    padding: 5px 10px;

    border: 1px solid #ccc;
    text-align: center;

    cursor: pointer;
    border-radius: 5px;
}

.LookupTableWidget__presets > i {
    padding-top: 0.3em;
    font-size: 150%;
}

.LookupTableWidget__presets > i.is-disabled {
    color: #ccc;
}

.LookupTableWidget.is-mode-none > .LookupTableWidget__range {
    display: flex;
}

.LookupTableWidget.is-mode-edit > .LookupTableWidget__range {
    display: flex;
}

.LookupTableWidget.is-mode-edit > .LookupTableWidget__editContent {
    display: flex;
}

.LookupTableWidget.is-mode-preset > .LookupTableWidget__presets {
    display: flex;
}

.LookupTableWidget__input {
    border: none;
    box-shadow: none;
    text-align: left;
    min-width: 2em;
}

.LookupTableWidget__input.right {
    text-align: right;
}
```

# Usage

Using some JSX pseudo code for the widget construction and usage.

```
import LookupTableManager from 'tonic-core/lib/model/LookupTable/LookupTableManager';
import LookupTableWidget  from 'tonic-ui/lib/react/widget/LookupTable';

// Load CSS with webpack + icons
require('font-awesome-webpack');
require('tonic-ui/lib/css/state.css');
require('tonic-ui/lib/react/widget/LookupTable/style.css');

var lut = LookupTableManager.addLookupTable('demo', [-5, 15], 'spectral');

[...]

<LookupTableWidget
    lut={ lut }
    lutManager={ LookupTableManager }
    originalRange= { lut.getScalarRange() },
    inverse={ true } />
```

# Components properties

**lut**: Instance of the LookupTable you want to edit from tonic-core/lib/model/LookupTable.

**lutManager**: Lookup Table Manager instance from tonic-core/lib/model/LookupTable.

**inverse**: true => The marker will use the complement color / false => Marker will be black or white

**listener**: A Tonic Mouse Handler if you want to capture mouse interaction on your end.

# Component methods

Once the React component rendered, you can call any of the following methods on
its instance.


**resetRange()** : Reset Lookup Table Scalar range to their original values.

**addControlPoint()** : Create a new control point set to the center of the range.

**deleteControlPoint()** : Remove current active control point.

**nextControlPoint()** : Activate the next control point.

**previousControlPoint()** : Activate the previous control point.

**updateScalar()** : Update active control point scalar value based on the DOM element value.

**updateRGB(rgb)** : Update the color of the active control point.

# [Live demo]({{site.baseurl}}/demo/LookupTable)

<iframe src="{{site.baseurl}}/demo/LookupTable" width="50%" height="300px">
</iframe>
