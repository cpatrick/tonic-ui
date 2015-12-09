// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');
require('../../../css/layout.css');

var React = require('react'),
    ReactDOM = require('react-dom'),
    ProbeViewerWidget = require('../../../react/viewer/Probe3D'),
    bodyElement = document.querySelector('.content'),
    jsonData = require('json!tonic-arctic-sample-data/data/probe/index.json'),
    QueryDataModel = require('tonic-io/lib/QueryDataModel'),
    ImageBuilder = require('tonic-core/lib/builder/image/DataProber'),
    LookupTableManager = require('tonic-core/lib/model/LookupTable/LookupTableManager.js'),
    component = null;


jsonData.metadata['dimensions'] = [50,50,50];
var dataModel = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/probe/'),

component = ReactDOM.render(
    React.createElement(
        ProbeViewerWidget,
        {
            queryDataModel: dataModel,
            imageBuilder: new ImageBuilder(dataModel, new LookupTableManager()),
            probe: true
        }),
    bodyElement);

dataModel.fetchData();
