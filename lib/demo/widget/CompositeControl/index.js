// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

// Get react component
var React = require('react'),
    ReactDOM = require('react-dom'),
    CompositePipeline = require('../../../react/widget/CompositeControl'),
    jsonData = require('./info.js'),
    CompositePipelineModel = require('tonic-core/lib/model/PipelineState'),
    model = new CompositePipelineModel(jsonData),
    component = null;

document.body.style.padding = '10px';

component = ReactDOM.render(
    React.createElement(
        CompositePipeline,
        { pipeline: jsonData.CompositePipeline, model: model }),
    document.querySelector('.content'));

model.onChange(function(data, envelope){
    component.forceUpdate();
});
