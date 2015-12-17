import ImageBuilder             from 'tonic-core/lib/builder/image/DepthComposite';
import ImageBuilderViewerWidget from '../../../react/viewer/ImageBuilder';
import PipelineModel            from 'tonic-core/lib/model/PipelineState';
import QueryDataModel           from 'tonic-io/lib/QueryDataModel';
import React                    from 'react';
import ReactDOM                 from 'react-dom';

// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

const
    jsonData = require('json!tonic-arctic-sample-data/data/webgl-raw-rgbd/index.json'),
    queryDataModel = new QueryDataModel(jsonData, __BASE_PATH__ + '/data/webgl-raw-rgbd/'),
    pipelineModel = new PipelineModel(queryDataModel.originalData),
    imageBuilder = new ImageBuilder(queryDataModel, pipelineModel);

ReactDOM.render(
    React.createElement(
        ImageBuilderViewerWidget, { queryDataModel, imageBuilder }),
        document.querySelector('.content'));

queryDataModel.fetchData();
