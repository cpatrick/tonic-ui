import ColorPicker from '../../../react/widget/ColorPicker';
import React       from 'react';
import ReactDOM    from 'react-dom';

function colorChange(color) {
    component.updateColor([ color[0], color[1], color[2] ]);
}

ReactDOM.render(
    React.createElement(
        ColorPicker,
        { color: [122,10,30], onChange: colorChange}),
    document.querySelector('.content'));
