import Cell     from '../Cell';
import Checkbox from '../Checkbox';
import Enum     from '../Enum';
import React    from 'react';
import Slider   from '../Slider';

/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */
const factoryMapping = {
        Cell:       prop => <Cell       key={prop.data.id} data={prop.data} ui={prop.ui} />,
        Slider:     prop => <Slider     key={prop.data.id} data={prop.data} ui={prop.ui} />,
        Enum:       prop => <Enum       key={prop.data.id} data={prop.data} ui={prop.ui} />,
        Checkbox:   prop => <Checkbox   key={prop.data.id} data={prop.data} ui={prop.ui} />,
};
/* eslint-enable react/display-name */
/* eslint-enable react/no-multi-comp */

function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

export default function (prop) {
    var fn = factoryMapping[capitalize(prop.ui.propType)];
    if (fn) {
        return fn(prop);
    }
    return null;
}