var React = require('react');

// This DRYs up the code for Cell, Enum, Slider and Bool quite a bit.
export default {
	propTypes: {
        name: React.PropTypes.string,
        help: React.PropTypes.string,
        data: React.PropTypes.object.isRequired,
        ui: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func
    },

    componentWillMount: function() {
        var newState = {};
        if (this.props.ui.default && !this.props.data.value) {
            newState.data = this.state.data
            newState.data.value = this.props.ui.default;
        }

        if (Object.keys(newState).length > 0) {
            this.setState(newState);
        }
    },

    getInitialState: function() {
        return {helpOpen: false,
            ui: this.props.ui,
            data: this.props.data
        };
    },

    getDefaultProps: function() {
        return {name: '', help: ''};
    },

    helpToggled: function(open) {
        this.setState({helpOpen: open});
    },
}
