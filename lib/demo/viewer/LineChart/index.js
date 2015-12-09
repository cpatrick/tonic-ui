// Load CSS
require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

// Get react component
var React = require('react'),
    ReactDOM = require('react-dom'),
    ChartViewer = require('../../../react/viewer/LineChart/index.js'),
    component = null,
    container = document.querySelector('.content'),
    data = { xRange: [ -10, 123 ], fields: [] };

function createField(name, size, scale) {
    var data = [];
    for(var i = 0; i < size; i++) {
        data.push(Math.random() * scale * 0.1 + Math.sin(i/size*Math.PI*4) * scale);
    }
    return { name, data };
}

data.fields.push(createField('Temperature', 500, 30));
data.fields.push(createField('Pressure', 500, 500));
data.fields.push(createField('Salinity', 500, 1));

container.style.width = '100%';
container.style.height = '100%';
container.style.position = 'absolute';
container.style.padding = '0';
// container.style.margin = '10px';
// container.style.border = 'solid 1px black';

component = ReactDOM.render(
    React.createElement(
        ChartViewer,
        { data , width: 500, height: 300 }),
    container);
