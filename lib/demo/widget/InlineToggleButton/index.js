import InlineToggleButton  from '../../../react/widget/InlineToggleButton';
import React      from 'react';
import ReactDOM   from 'react-dom';

// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
const logo = require('../../../../docs/images/tonic-ui.png')

function onChange(obj, idx) {
    console.log('Active', obj, idx);
}

ReactDOM.render(
    React.createElement(
        InlineToggleButton,
        { 
            activeColor: 'red',
            defaultColor: 'green',
            height: '0.75em',
            options: [ 
                { label: 'First' },
                { label: 'A' },
                { label: 'B' },
                { label: 'C' },
                { img: logo },
                { icon: 'fa fa-twitter' },
                { label: 'Last' },
            ], 
            onChange ,
        } ),
    document.querySelector('.content'));
