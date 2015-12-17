import ImageBuilder        from 'tonic-core/lib/builder/image/DataProber';
import LookupTableManager  from 'tonic-core/lib/model/LookupTable/LookupTableManager.js';
import ProbeViewerWidget   from '../../../react/viewer/Probe3D';
import QueryDataModel      from 'tonic-io/lib/QueryDataModel';
import React               from 'react';
import ReactDOM            from 'react-dom';

// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');
require('../../../css/layout.css');

const
    bodyElement = document.querySelector('.content'),
    jsonData = require('json!tonic-arctic-sample-data/data/probe/index.json');

// Fix dimension
jsonData.metadata['dimensions'] = [50,50,50];

const
    dataModel = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/probe/'),

ReactDOM.render(
    React.createElement(
        ProbeViewerWidget,
        {
            queryDataModel: dataModel,
            imageBuilder: new ImageBuilder(dataModel, new LookupTableManager()),
            probe: true
        }),
    bodyElement);

dataModel.fetchData();
