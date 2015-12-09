# ImageBuilder

ImageBuilder is a React component using the AbstractMenu to
encapsulate a ParameterSet. Not to be confused with
[tonic-core](https://kitware.github.io/tonic-core/)

The widget is imported using the following:

```js
var ImageBuilder = require('tonic-ui/lib/react/viewer/ImageBuilder');
```

## Properties

- __queryDataModel__: Instance of the QueryDataModel, used core data handler.

We expect data from the __queryDataModel__ to be named 'image'.
