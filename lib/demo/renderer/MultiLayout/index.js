import equals               from 'mout/src/array/equals';
import ImageBuilder         from 'tonic-core/lib/builder/image/DataProber';
import LookupTableManager   from 'tonic-core/lib/model/LookupTable/LookupTableManager.js';
import MultiViewRenderer    from '../../../react/renderer/MultiLayout';
import QueryDataModel       from 'tonic-io/lib/QueryDataModel';
import React                from 'react';
import ReactDOM             from 'react-dom';

// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

const
    jsonData = require('json!tonic-arctic-sample-data/data/probe/index.json'),
    container = document.querySelector('.content'),
    dataModel = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/probe/'),
    lutManager = new LookupTableManager(),
    imageBuilderA = new ImageBuilder(dataModel, lutManager),
    imageBuilderB = new ImageBuilder(dataModel, lutManager),
    imageBuilderC = new ImageBuilder(dataModel, lutManager);

var component = null;

// Configure Image builders
var field = imageBuilderA.getFields()[0];
imageBuilderA.setField(field);
imageBuilderB.setField(field);
imageBuilderC.setField(field);

imageBuilderA.setProbe(10,10,10);
imageBuilderB.setProbe(10,10,10);
imageBuilderC.setProbe(10,10,10);

imageBuilderA.renderMethod = 'XY';
imageBuilderB.renderMethod = 'ZY';
imageBuilderC.renderMethod = 'XZ';

imageBuilderA.update();
imageBuilderB.update();
imageBuilderC.update();

function updateProbeLocationFromA(data, envelope) {
    var builders = [imageBuilderB, imageBuilderC];

    builders.forEach(function(builder) {
        if(!equals(data, builder.getProbe())) {
            builder.setProbe(data[0], data[1], data[2])
        }
    });
}
function updateProbeLocationFromB(data, envelope) {
    var builders = [imageBuilderA, imageBuilderC];

    builders.forEach(function(builder) {
        if(!equals(data, builder.getProbe())) {
            builder.setProbe(data[0], data[1], data[2])
        }
    });
}
function updateProbeLocationFromC(data, envelope) {
    var builders = [imageBuilderA, imageBuilderB];

    builders.forEach(function(builder) {
        if(!equals(data, builder.getProbe())) {
            builder.setProbe(data[0], data[1], data[2])
        }
    });
}
imageBuilderA.onProbeChange(updateProbeLocationFromA);
imageBuilderB.onProbeChange(updateProbeLocationFromB);
imageBuilderC.onProbeChange(updateProbeLocationFromC);

// Configure container
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.overflow = 'hidden';

container.style.width = '100%'
container.style.height = '100%'
container.style.position = 'absolute'

component = ReactDOM.render(
    React.createElement(
        MultiViewRenderer,
        {
            renderers: {
                'XY': { builder: imageBuilderA, name: 'XY'},
                'ZY': { builder: imageBuilderB, name: 'ZY'},
                'XZ': { builder: imageBuilderC, name: 'XZ'}
            }
        }),
        container
    );

dataModel.fetchData();
