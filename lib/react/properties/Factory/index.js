var React = require('react'),
    Cell = require('../Cell'),
    Slider = require('../Slider'),
    Enum = require('../Enum'),
    Checkbox = require('../Checkbox'),

    FactoryMapping = {
        Cell: function(prop) {
            return (
                <Cell
                    key={prop.data.id}
                    data={prop.data}
                    ui={prop.ui} />
                );
        },
        Slider: function(prop) {
            return (
                <Slider
                    key={prop.data.id}
                    data={prop.data}
                    ui={prop.ui} />
                );
        },
        Enum: function(prop) {
            return (
                <Enum
                    key={prop.data.id}
                    data={prop.data}
                    ui={prop.ui} />
                );
        },
        Checkbox: function(prop) {
            return (
                <Checkbox
                    key={prop.data.id}
                    data={prop.data}
                    ui={prop.ui} />
                );
        }
    };

function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

export default function (prop) {
    var fn = FactoryMapping[capitalize(prop.ui.propType)];
    if (fn) {
        return fn(prop);
    }
    return null;
}