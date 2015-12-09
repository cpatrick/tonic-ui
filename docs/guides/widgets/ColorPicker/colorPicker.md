---
layout: docs
title: Color Picker
permalink: /docs/ColorPicker/
prev_section: CollapsibleElement
next_section: CompositeControl
repo_path: /docs/guides/widgets/ColorPicker/colorPicker.md
---

# Introduction

The ColorPicker component available here is build using the React library and
looks like that.

![Color Picker Widget representation]({{site.baseurl}}/docs/ColorPicker.jpg "Color Picker Widget representation")

# Component styles

```
.ColorPicker {
    min-width: 5em;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    display: flex;
}

.ColorPicker__color {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
}

.ColorPicker__color > canvas {
    flex: none;
    width: 1.5em;
    height: 1.5em;
    border: 1px solid #000;
    margin-right: 5px;
}

.ColorPicker__color > input {
    flex: 1;
    min-width: 1em;
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    text-align: right;
    padding-right: 10px;
}

.ColorPicker__swatch {
    display: flex;
    flex-direction: row;
    margin-left: 2px;
    margin-right: 2px;
}

.ColorPicker__swatch > img {
    width: 100%;
}
```

# Usage

Using some JSX pseudo code for the widget construction and usage.

```
import ColorPicker from 'tonic-ui/lib/react/widget/ColorPicker';

// If you are using Webpack you can also load the default CSS like that
require('tonic-ui/lib/react/widget/ColorPicker/style.css')

function callback(color) {
    var red   = color[0],
        green = color[1],
        blue  = color[2];

    if(red === 255 && green === 255 && blue === 255) {
        alert("You picked White");
    }
}

var initialColor = [0, 128, 255];

[...]

<ColorPicker
    color={ initialColor }
    onChange={ callback }
    swatch={ optional: url for a different color palette} />

```

# Component methods

Once the React component rendered, you can call any of the following methods on
its instance.

**updateColor(color)** : Will update the current active color.

**updateSwatch(url)** : Let you pick a different color swatch.

# [Live demo]({{site.baseurl}}/demo/ColorPicker)

<iframe src="{{site.baseurl}}/demo/ColorPicker" width="50%" height="165px">
</iframe>
