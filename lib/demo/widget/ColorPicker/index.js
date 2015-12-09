// Get react component
var React = require('react'),
    ReactDOM = require('react-dom'),
    ColorPicker = require('../../../react/widget/ColorPicker'),
    component = null;

function colorChange(color) {
    component.updateColor([ color[0], color[1], color[2] ]);
}

component = ReactDOM.render(
    React.createElement(
        ColorPicker,
        { color: [122,10,30], onChange: colorChange}),
    document.querySelector('.content'));
