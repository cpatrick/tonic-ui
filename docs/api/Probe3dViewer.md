# Probe3dViewer

Probe3dViewer is a React component using the AbstractMenu to
encapsulate a ParameterSet with a set of controls
regarding the probe locationand the orientation of the view to render.

The widget is imported with:

```js
var Probe3dViewer = require('tonic-ui/lib/react/viewer/Probe3D');
```

## InitialState

```js
{
    renderMethod: 'renderXY',
    renderMethods: ['renderXY', 'renderZY', 'renderXZ'],
    probe: [
        this.props.imageBuilder.getProbe()[0],
        this.props.imageBuilder.getProbe()[1],
        this.props.imageBuilder.getProbe()[2]
    ]
}
```

## Properties

- __queryDataModel__: Instance of the QueryDataModel to be used as core data handler.
- __imageBuilder__: Instance of an image builder to be used with the current dataset.

We expect to call the following set of methods and properties on the __imageBuilder__ instance:

- __setPipelineQuery(String)__
- __setPushMethodAsBuffer()__
- __setProbe(i, j, k)__
- __getProbe() => [i,j,k]__
- __metadata.dimensions__

