# Widget Factory

Widget Factory is a React factory for generating control widgets.

## createWidget(name, model)

Returns a widget depending on _name_. _model_ will be passed to it and a rendered React component will be returned.

## getWidgets(obj) : [React components]

Returns an array of React components (widgets) derived from _obj_. Often an ImageBuilder, _obj_ should expose a function _getControlWidgets()_ which returns a list of names of widgets to be created for the controlinn _obj_.