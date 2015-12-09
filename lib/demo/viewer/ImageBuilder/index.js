// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

var React = require('react'),
    ReactDOM = require('react-dom'),
    ImageBuilderViewerWidget = require('../../../react/viewer/ImageBuilder'),
    jsonData = require('json!tonic-arctic-sample-data/data/earth/index.json'),
    QueryDataModel = require('tonic-io/lib/QueryDataModel'),
    ImageBuilder = require('tonic-core/lib/builder/image/QueryDataModel'),
    queryDataModel = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/earth/'),
    imageBuilder = new ImageBuilder(queryDataModel),
    component = null;

component = ReactDOM.render(
    React.createElement(
        ImageBuilderViewerWidget, { queryDataModel, imageBuilder }),
        document.querySelector('.content'));

queryDataModel.fetchData()
