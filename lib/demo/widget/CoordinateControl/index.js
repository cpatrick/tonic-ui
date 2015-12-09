var React = require('react'),
    ReactDOM = require('react-dom'),
    CoordinateControl = require('../../../react/widget/CoordinateControl'),
    component = null;

component = ReactDOM.render(
    React.createElement(CoordinateControl),
    document.querySelector('.content'));
