# MutliLayoutRenderer

MutliLayoutRenderer is a React component which managers multiple views
in a user defined layout. It's best instatiated from
a [MultiLayout viewer]({{site.baseurl}}/api/MultiLayout).

## Properties

- __imageBuilders__: Required. An object containing ImageBuilders to fill the views.
- __spacing__: Spacing between views
- __borderColor__: Border color of views when they aren't active, as hex or rgb(a).
- __activeColor__: Border color of views when they are active, as hex or rgb(a).
- __crosshairColor__: Color of crosshair, as hex or rgb(a).