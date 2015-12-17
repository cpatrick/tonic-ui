import React                        from 'react';
import ReactDOM                     from 'react-dom';
import ImageBuilderViewerWidget     from '../../../react/viewer/ImageBuilder';
import QueryDataModel               from 'tonic-io/lib/QueryDataModel';
import ImageBuilder                 from 'tonic-core/lib/builder/image/QueryDataModel';

// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

const
    jsonData = require('json!tonic-arctic-sample-data/data/earth/index.json'),
    queryDataModel = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/earth/'),
    imageBuilder = new ImageBuilder(queryDataModel),
    component = ReactDOM.render(
        React.createElement(
            ImageBuilderViewerWidget, { queryDataModel, imageBuilder }),
            document.querySelector('.content')
        );

queryDataModel.fetchData()
