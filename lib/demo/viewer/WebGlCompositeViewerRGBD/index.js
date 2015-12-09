// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

var React = require('react'),
    ReactDOM = require('react-dom'),
    ImageBuilderViewerWidget = require('../../../react/viewer/ImageBuilder/'),
    jsonData = require('json!tonic-arctic-sample-data/data/webgl-rgbd/index.json'),
    QueryDataModel = require('tonic-io/lib/QueryDataModel'),
    PipelineModel = require('tonic-core/lib/model/PipelineState'),
    ImageBuilder = require('tonic-core/lib/builder/image/DepthComposite'),
    queryDataModel = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/webgl-rgbd/'),
    pipelineModel = new PipelineModel(queryDataModel.originalData),
    imageBuilder = new ImageBuilder(queryDataModel, pipelineModel),
    component = null;

component = ReactDOM.render(
    React.createElement(
        ImageBuilderViewerWidget, { queryDataModel, imageBuilder }),
        document.querySelector('.content'));

queryDataModel.fetchData();
