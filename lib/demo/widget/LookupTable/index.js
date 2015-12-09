// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

// Get react component
var React = require('react'),
    ReactDOM = require('react-dom'),
    LookupTableWidget = require('../../../react/widget/LookupTable'),
    component = null,
    LookupTableManager = require('tonic-core/lib/model/LookupTable/LookupTableManager'),
    lutManager = new LookupTableManager(),
    lut = lutManager.addLookupTable('demo', [-5, 15], 'spectral');

document.body.style.padding = '10px';

component = ReactDOM.render(
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
