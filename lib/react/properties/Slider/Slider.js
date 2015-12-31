var React = require('react'),
    NumberSliderControl = require('../../widget/NumberSliderControl');

export default React.createClass({
    displayName: 'Slider',
    propTypes: {
        idx: React.PropTypes.number,
        onChange: React.PropTypes.func,
    },

    valueChange(e) {
        if (this.props.onChange) {
            if (this.props.idx >= 0) {
                this.props.onChange(this.props.idx, e.target.value);
            } else {
                this.props.onChange(null, e.target.value);
            }
        }
    },

    render() {
        var propsCopy ={}
        Object.assign(propsCopy, this.props);
        delete propsCopy.onChange;
        delete propsCopy.idx;
        return (<NumberSliderControl
            { ...propsCopy }
            onChange={this.valueChange} />
        );
    },
});