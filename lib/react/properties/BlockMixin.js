// This DRYs up the code for Cell, Enum, Slider and Bool quite a bit.
/* eslint-disable babel/object-shorthand */
export default {
    getDefaultProps: function() {
        return { name: '', help: ''};
    },

    getInitialState: function() {
        return {
            data: this.props.data,
            helpOpen: false,
            ui: this.props.ui,
        };
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

    helpToggled: function(open) {
        this.setState({helpOpen: open});
    },
}
/* eslint-enable babel/object-shorthand */
