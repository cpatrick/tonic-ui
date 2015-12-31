import React    from 'react';
import factory  from './Factory';

export default React.createClass({

    displayName: 'InputPanel',

    propTypes: {
        input: React.PropTypes.array,
    },

    getDefaultProps() {
        return { input: [] };
    },

    valueChange(name, newVal) {
        console.log(name, newVal);
    },

    render() {
        var generateUI = function(input) {
            return factory(input);
        };

        return (
            <section>
                {this.props.input.map(generateUI)}
            </section>
        );
    },
});