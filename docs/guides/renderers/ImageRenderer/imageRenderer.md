---
layout: docs
title: Image Renderer
permalink: /docs/ImageRenderer/
prev_section: ParameterSet
next_section: MultiLayoutRenderer
repo_path: /docs/guides/widgets/ImageRenderer/imageRenderer.md
---

# Introduction

The Image Renderer component available here is build using the React library and
allow to render an Image or a Canvas object while providing 2D interactions such
as zooming and panning.

You can zoom in and out in the rendering image by using your scroll/wheel input
device. The zoom will maintain the location of the image underneath the pointer.

You can pan by dragging the image around.

When additional mouse listeners are provided as an underneath handler, the zoom
and pan action will be disabled unless those handler are not consuming the event.
This mean that if your application capture the drag without any key modifier,
the drag will be effective as soon as you are using any key modifier.


# Component styles

That component does not provide any specific CSS and is only composed of a single
Canvas element with **CanvasImageRenderer** as the class name.

# Usage

Using some JSX pseudo code for the widget construction and usage.

```
import ImageRenderer from 'tonic-ui/lib/react/renderer/Image';

var myMouseListener = {
    drag: function(event) { console.log(event); return false; },
    zoom: function(event) { return false; }
}

[...]

<ImageRenderer
    minZoom='0.1'
    maxZoom='10'
    sensitivity='500'
    listener={ myMouseListener } />

```

# Components properties

**minZoom**: 0.1 (Minimum zoom value)

**maxZoom**: 10 (Maximum zoom value)

**sensitivity**: 1000 (Scroll for zoom speed. Bigger is more precise)

**crosshairColor**: '#000' (Color of the cross-hair if any)

**listener**: A Tonic Mouse Handler if you want to capture mouse interaction on your end.

# Component methods

Once the React component rendered, you can call any of the following methods on
its instance.

**renderImage(data)** : Render an image based on its URL. The data object should be something like

```
{ url: 'http://..../image.jpg' }
```

**renderCanvas(data)** : Render a canvas object. The provided data object should looks like

```
{
    canvas: inputCanvas,          // Canvas to get the image from
    area: [ x, y, width, height], // Region of interest from canvas
    outputSize: [400, 500],       // Targeted size regardless of ImageRenderer zoom

    // --- Optional ---

    crosshair: [x, y]             // Draw a cross-hair line on the destination image
}
```

**resetCamera()** : Rescale the image so it could fit within the container and center it.

# [Live demo]({{site.baseurl}}/demo/ImageRenderer)

<iframe src="{{site.baseurl}}/demo/ImageRenderer" width="100%" height="400px">
</iframe>
