import LookupTableManager from 'tonic-core/lib/model/LookupTable/LookupTableManager';
import LookupTableWidget  from '../../../react/widget/LookupTable';
import React              from 'react';
import ReactDOM           from 'react-dom';

// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

// Get react component
const
    lutManager = new LookupTableManager(),
    lut = lutManager.addLookupTable('demo', [-5, 15], 'spectral');

document.body.style.padding = '10px';

var component = ReactDOM.render(
    React.createElement(
        LookupTableWidget,
        {
            lut: lut,
            originalRange: [-5, 15],
            inverse: true,
            lutManager: lutManager
        }),
    document.querySelector('.content'));


setTimeout(function(){
    component.resetRange();
}, 500);
