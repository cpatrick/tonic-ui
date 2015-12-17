import CollapsibleElement           from '../../../react/widget/CollapsibleElement';
import CompositeControl             from '../../../react/widget/CompositeControl';
import MultiViewerWidget            from '../../../react/viewer/MultiLayout';
import PipelineModel                from 'tonic-core/lib/model/PipelineState';
import PixelOperatorImageBuilder    from 'tonic-core/lib/builder/image/PixelOperator';
import QueryDataModel               from 'tonic-io/lib/QueryDataModel';
import QueryDataModelWidget         from '../../../react/widget/ParameterSet/QueryDataModelWidget';
import React                        from 'react';
import ReactDOM                     from 'react-dom';

// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

const
    bodyElement = document.querySelector('.content'),
    jsonData = require('json!tonic-arctic-sample-data/data/volume/index.json'),
    queryDataModel = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/volume/'),
    pipelineModel = new PipelineModel(queryDataModel.originalData),
    depthImageBuilder = new PixelOperatorImageBuilder(),
    colorImageBuilder = new PixelOperatorImageBuilder(),
    blendImageBuilder = new PixelOperatorImageBuilder('(a+b)/2'),
    fetchQuery = { name: 'pipeline_data', categories: [] };

// Add mouse interaction
depthImageBuilder.setListeners(queryDataModel.getTonicMouseListener());
colorImageBuilder.setListeners(queryDataModel.getTonicMouseListener());

depthImageBuilder.onImageReady(function(data, envelope){
    blendImageBuilder.updateData('a', data);
});
colorImageBuilder.onImageReady(function(data, envelope){
    blendImageBuilder.updateData('b', data);
});

function fetchData() {
    queryDataModel.fetchData(fetchQuery);
}

// Handle pipeline and data binding
queryDataModel.onStateChange(fetchData);
queryDataModel.on('pipeline_data', function(data, envelope) {
    var imageSize = jsonData.CompositePipeline.dimensions;
    for(var dataName in data) {
        var name = dataName.split('_')[0];

        if(name.length === 2) {
            var image = data[dataName].image;
            // Color
            colorImageBuilder.updateDataFromImage(name, image);
        } else {
            // Depth
            var depthArray = new Uint8Array(data[dataName].data),
                expendedArray = new Uint8ClampedArray(depthArray.length * 4),
                size = depthArray.length;

            for(var i = 0; i < size; i++) {
                expendedArray[i*4 + 0] = depthArray[i];
                expendedArray[i*4 + 1] = depthArray[i];
                expendedArray[i*4 + 2] = depthArray[i];
                expendedArray[i*4 + 3] = 255;
            }

            depthImageBuilder.updateDataFromClampedArray(name, expendedArray, imageSize);
        }
    }
})

pipelineModel.onChange(function(pipelineQuery) {
    var size = pipelineQuery.length,
        depthDependencies = [],
        colorDependencies = [];

    for(var i = 0; i < size; i += 2) {
        if(pipelineQuery[i+1] !== '_') {
            depthDependencies.push(pipelineQuery[i]);
            colorDependencies.push(pipelineQuery.slice(i, i+2))
        }
    }

    // Update Pixel Operator (op+dep)
    depthImageBuilder.setDependencies(depthDependencies);
    if(depthDependencies.length) {
        depthImageBuilder.setOperation('('+depthDependencies.join('+') + ')/' + depthDependencies.length);
    }

    colorImageBuilder.setDependencies(colorDependencies);
    if(colorDependencies.length) {
        var ratio = '/' + colorDependencies.length;
        colorImageBuilder.setOperation(colorDependencies.join(ratio + '+') + ratio);
    }

    // Update Query
    fetchQuery.categories = [].concat(depthDependencies, colorDependencies);
    fetchData();
})

// Create UI element
ReactDOM.render(
    React.createElement(
        MultiViewerWidget,
        {
            queryDataModel,
            layout: '2x1',
            menuAddOn: [
                <CollapsibleElement title="Pipeline" key='CompositeControl_parent'>
                    <CompositeControl
                        key='CompositeControl'
                        model={ pipelineModel }
                    />
                </CollapsibleElement>,
                <CollapsibleElement title="Parameters" key='QueryDataModelWidget_parent'>
                <QueryDataModelWidget
                        key='QueryDataModelWidget'
                        model={ queryDataModel }
                   />
                </CollapsibleElement>
            ],
            renderers: {
                'RGB': { builder: colorImageBuilder, name: 'RGB'},
                'Depth': { builder: depthImageBuilder, name: 'Depth'},
                'Blend': { builder: blendImageBuilder, name: 'Blend'}
            }
        }),
    bodyElement);

pipelineModel.triggerChange();
