var React = require('react'),
    Factory = require('./Factory');

export default React.createClass({
    propTypes: {
        input: React.PropTypes.array
    },

    getDefaultProps(){
        input: []
    },

    valueChange(name, newVal) {
        console.log(name, newVal);
    },

    render() {
        var generateUI = function(input) {
            return Factory(input);
        };

        return (
            <section>
                {this.props.input.map(generateUI)}
            </section>
        );
    }
});