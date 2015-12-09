var React = require('react'),
    ReactDOM = require('react-dom'),
    ButtonSelector = require('../../../react/widget/ButtonSelector'),
    container = document.querySelector('.content'),
    component = null;

function process(idx, list) {
    console.log(idx, list);
}

component = ReactDOM.render(
    React.createElement(
        ButtonSelector,
        { list: [{name: "Choice A"}, {name: "Choice B"}, {name: "Choice C"}], onChange: process}),
    container);

container.style.margin = 0;
