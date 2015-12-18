import QueryDataModel       from 'tonic-io/lib/QueryDataModel';
import QueryDataModelWidget from '../../../react/widget/ParameterSet/QueryDataModelWidget.js';
import React                from 'react';
import ReactDOM             from 'react-dom';

// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

// Get react component
const
    jsonData = require('./info.js').default,
    dataModel = new QueryDataModel(jsonData, '/');

document.body.style.padding = '10px';

ReactDOM.render(
    React.createElement(
        QueryDataModelWidget,
        { model: dataModel }),
    document.querySelector('.content'));
