// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

// Get react component
var React = require('react'),
    ReactDOM = require('react-dom'),
    QueryDataModelWidget = require('../../../react/widget/ParameterSet/QueryDataModelWidget.js'),
    jsonData = require('./info.js'),
    QueryDataModel = require('tonic-io/lib/QueryDataModel'),
    dataModel = new QueryDataModel(jsonData, '/'),
    component = null;

document.body.style.padding = '10px';

component = ReactDOM.render(
    React.createElement(
        QueryDataModelWidget,
        { model: dataModel }),
    document.querySelector('.content'));
