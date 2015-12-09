// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');
require('../../../css/layout.css');

var React = require('react'),
    ReactDOM = require('react-dom'),
    ImageBuilderViewerWidget = require('../../../react/viewer/ImageBuilder'),
    bodyElement = document.querySelector('.content'),
    jsonData = require('json!tonic-arctic-sample-data/data/float-image/index.json'),
    QueryDataModel = require('tonic-io/lib/QueryDataModel'),
    ImageBuilder = require('tonic-core/lib/builder/image/FloatImage'),
    LookupTableManager = require('tonic-core/lib/model/LookupTable/LookupTableManager.js'),
    component = null;

var dataModel = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/float-image/'),

component = ReactDOM.render(
    React.createElement(
        ImageBuilderViewerWidget,
        {
            queryDataModel: dataModel,
            imageBuilder: new ImageBuilder(dataModel, new LookupTableManager())
        }),
    bodyElement);

dataModel.fetchData();
