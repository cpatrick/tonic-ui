import ImageBuilder                from 'tonic-core/lib/builder/image/FloatImage';
import ImageBuilderViewerWidget    from '../../../react/viewer/ImageBuilder';
import LookupTableManager          from 'tonic-core/lib/model/LookupTable/LookupTableManager.js';
import QueryDataModel              from 'tonic-io/lib/QueryDataModel';
import React                       from 'react';
import ReactDOM                    from 'react-dom';

// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');
require('../../../css/layout.css');

const
    bodyElement = document.querySelector('.content'),
    jsonData = require('json!tonic-arctic-sample-data/data/float-image/index.json'),
    dataModel = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/float-image/'),
    component = ReactDOM.render(
        React.createElement(
            ImageBuilderViewerWidget,
            {
                queryDataModel: dataModel,
                imageBuilder: new ImageBuilder(dataModel, new LookupTableManager())
            }),
        bodyElement);

dataModel.fetchData();
