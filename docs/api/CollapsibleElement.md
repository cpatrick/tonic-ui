# CollapsibleElement

CollapsibleElement is a React component which creates a
collapsible element with a title bar and a subtitle.

The widget is imported using the following:

```js
var CollapsibleElement = require('tonic-ui/lib/react/widget/CollapsibleElement');
```

## DefaultProperties

```js
{
    title: '',
    subtitle: '',
    open: true
}
```

## isCollapsed()

Returns true of _open_ is false.

## isExpanded()

Returns true if _open_ is true.

## Properties

- __title__: Title element, appears next to button.
- __subtitle__: Subtitle element, appears on the right of the container.
- __open__: A boolean value if the element's children are visible or not.
- __children__: A React element or HTML content, hidden or shown depending on the value of _open_.
