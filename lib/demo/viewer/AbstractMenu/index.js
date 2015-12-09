// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

var React = require('react'),
    ReactDOM = require('react-dom'),
    CatalystWeb = require('../../../react/viewer/AbstractMenu'),
    bodyElement = document.querySelector('.content'),
    jsonData = require('json!tonic-arctic-sample-data/data/earth/index.json'),
    QueryDataModel = require('tonic-io/lib/QueryDataModel'),
    ImageBuilder = require('tonic-core/lib/builder/image/QueryDataModel'),
    queryDataModel = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/earth/'),
    imageBuilder = new ImageBuilder(queryDataModel),
    component = null;

component = ReactDOM.render(
    React.createElement(
        CatalystWeb,
        {
            queryDataModel,
            imageBuilder,
            children: [
                (<p key='a'>This is the <em>Catalyst widget</em>, takes a QueryDataModel and this content.</p>),
                (<p key='b'>You can put HTML or a React component here, a <em>QueryDataModelWidget</em> for example goes well here.</p>),
                (<button key='c' onClick={()=>alert('button pressed')}>Press me</button>)
            ]
        }),
    bodyElement);

queryDataModel.fetchData()
