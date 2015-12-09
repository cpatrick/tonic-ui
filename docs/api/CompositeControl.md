# CompositeControl

CompositeControl is a React component that is made to be used by others.
The widget needs a PipelineState from tonic-core/lib/model to manage
the pipeline state.

The widget is imported using the following way:

```js
var CompositeControl = require('tonic-ui/lib/react/widget/CompositeControl');
```

## Properties

- __model__: Instance of the PipelineState to use as model.
