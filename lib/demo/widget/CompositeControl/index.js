import CompositePipeline        from '../../../react/widget/CompositeControl';
import CompositePipelineModel   from 'tonic-core/lib/model/PipelineState';
import React                    from 'react';
import ReactDOM                 from 'react-dom';

// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

// Get react component
const
    jsonData = require('./info.js').default,
    model = new CompositePipelineModel(jsonData);

document.body.style.padding = '10px';

var component = ReactDOM.render(
    React.createElement(
        CompositePipeline,
        { pipeline: jsonData.CompositePipeline, model: model }),
    document.querySelector('.content'));

model.onChange(function(data, envelope){
    component.forceUpdate();
});
