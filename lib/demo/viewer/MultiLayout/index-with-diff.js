import equals                    from 'mout/src/array/equals';
import ImageBuilder              from 'tonic-core/lib/builder/image/DataProber';
import LookupTableManager        from 'tonic-core/lib/model/LookupTable/LookupTableManager.js';
import MultiViewerWidget         from '../../../react/viewer/MultiLayout';
import PixelOperatorImageBuilder from 'tonic-core/lib/builder/image/PixelOperator';
import QueryDataModel            from 'tonic-io/lib/QueryDataModel';
import React                     from 'react';
import ReactDOM                  from 'react-dom';

// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

const
    bodyElement = document.querySelector('.content'),
    jsonData = require('json!tonic-arctic-sample-data/data/probe/index.json'),
    dataModelA = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/probe/'),
    dataModelB = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/probe/'),
    dataModelC = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/probe/'),
    lutManager = new LookupTableManager(),
    imageBuilderA = new ImageBuilder(dataModelA, lutManager),
    imageBuilderB = new ImageBuilder(dataModelB, lutManager),
    imageBuilderC = new ImageBuilder(dataModelC, lutManager),
    diffImageBuilder = new PixelOperatorImageBuilder();

// Handling Diff computation
imageBuilderA.onImageReady(function(data, envelope){
    diffImageBuilder.updateData('a', data);
});
imageBuilderB.onImageReady(function(data, envelope){
    diffImageBuilder.updateData('b', data);
});
imageBuilderC.onImageReady(function(data, envelope){
    diffImageBuilder.updateData('c', data);
});

function updateCrosshairVisibility(data, envelope) {
    var builders = [imageBuilderA, imageBuilderB, imageBuilderC];

    builders.forEach(function(builder) {
        builder.setCrossHairEnable(data);
    });
}

imageBuilderA.onCrosshairVisibilityChange(updateCrosshairVisibility);
imageBuilderB.onCrosshairVisibilityChange(updateCrosshairVisibility);
imageBuilderC.onCrosshairVisibilityChange(updateCrosshairVisibility);

// Create UI element
ReactDOM.render(
    React.createElement(
        MultiViewerWidget,
        {
            queryDataModel: dataModelA,
            renderers: {
                'a': { builder: imageBuilderA, name: 'a'},
                'b': { builder: imageBuilderB, name: 'b'},
                'c': { builder: imageBuilderC, name: 'c'},
                'Operation': { builder: diffImageBuilder, name: 'Operation'}
            }
        }),
    bodyElement);

dataModelA.fetchData();
dataModelB.fetchData();
dataModelC.fetchData();
