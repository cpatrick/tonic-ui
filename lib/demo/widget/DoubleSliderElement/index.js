import DoubleSliderElement  from '../../../react/widget/DoubleSliderElement';
import React      from 'react';
import ReactDOM   from 'react-dom';

// Load CSS
require('normalize.css');

function onChange(event) {
    console.log('Value', event.target.value);
}

ReactDOM.render(
    React.createElement(
        DoubleSliderElement,
        { 
          min: '0',
          max: '100',
          value: 50,
          onChange
        } ),
    document.querySelector('.content'));
