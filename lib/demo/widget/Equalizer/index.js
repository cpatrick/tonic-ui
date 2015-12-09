// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

// Get react component
var React = require('react'),
    ReactDOM = require('react-dom'),
    Equalizer = require('../../../react/widget/Equalizer'),
    component = null;

document.body.style.height = '90vp';
document.body.style.width = '90vp';
document.body.style.margin = 0;

function onChange(opacityList) {
    // console.log(opacityList);
}

component = ReactDOM.render(
    React.createElement(
        Equalizer,
        { layers: [ 0, 0.1, 0.2, 1.0, 0.8, 0.4, 0.1, 0.2, 1.0, 0.8, 0.4, 0.1, 0.2, 1.0, 0.8, 0.4, 0.1, 0.2, 1.0, 0.8, 0.4 ], onChange } ),
    document.querySelector('.content'));
