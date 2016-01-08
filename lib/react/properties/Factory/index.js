import Cell     from '../Cell';
import Checkbox from '../Checkbox';
import Enum     from '../Enum';
import React    from 'react';
import Slider   from '../Slider';

/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */
/* eslint-disable max-len */
const factoryMapping = {
        Cell:       (prop, viewData, onChange) => <Cell       key={prop.data.id} data={prop.data} ui={prop.ui} viewData={viewData} show={prop.show} onChange={onChange}/>,
        Slider:     (prop, viewData, onChange) => <Slider     key={prop.data.id} data={prop.data} ui={prop.ui} viewData={viewData} show={prop.show} onChange={onChange}/>,
        Enum:       (prop, viewData, onChange) => <Enum       key={prop.data.id} data={prop.data} ui={prop.ui} viewData={viewData} show={prop.show} onChange={onChange}/>,
        Checkbox:   (prop, viewData, onChange) => <Checkbox   key={prop.data.id} data={prop.data} ui={prop.ui} viewData={viewData} show={prop.show} onChange={onChange}/>,
};
    
/* eslint-enable react/display-name */
/* eslint-enable react/no-multi-comp */
/* eslint-enable max-len */

function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

export default function (prop, vd, onChange) {
    var fn = factoryMapping[capitalize(prop.ui.propType)];
    if (fn) {
        return fn(prop, vd, onChange);
    }
    return null;
}