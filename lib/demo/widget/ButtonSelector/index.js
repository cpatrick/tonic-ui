import React            from 'react';
import ReactDOM         from 'react-dom';
import ButtonSelector   from '../../../react/widget/ButtonSelector';

const
    container = document.querySelector('.content');

function process(idx, list) {
    console.log(idx, list);
}

ReactDOM.render(
    React.createElement(
        ButtonSelector,
        { list: [{name: "Choice A"}, {name: "Choice B"}, {name: "Choice C"}], onChange: process}),
    container);

container.style.margin = 0;
