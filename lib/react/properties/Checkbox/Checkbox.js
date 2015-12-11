var React = require('react');

export default React.createClass({
    propTypes: {
        idx: React.PropTypes.number,
        value: React.PropTypes.bool,
        label: React.PropTypes.string
    },

    getDefaultProps() {
        return {value: false, label: ''};
    },

    valueChange(e) {
        if (this.props.onChange) {
            if (this.props.idx >= 0) {
                this.props.onChange(this.props.idx, e.target.checked);
            } else {
                this.props.onChange(null, e.target.checked);
            }
        }
    },

    render() {
        return (
            <div>
                <label className="Checkbox_label">{this.props.label}</label>
                <input type="checkbox"
                    checked={this.props.value}
                    onChange={this.valueChange}>
                </input>
            </div>
        );
    }
});