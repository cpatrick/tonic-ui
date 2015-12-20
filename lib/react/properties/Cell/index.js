require('./style.css');

var React = require('react'),
    BlockMixin = require('../BlockMixin'),
    Layouts = require('./Layouts'),
    ToggleIconButton = require('../../widget/ToggleIconButton');

export default React.createClass({
    displayName: 'CellProp',
    mixins: [BlockMixin],

    valueChange(idx, newVal) {
        var newData = this.state.data;
        newData.value[idx] = newVal;
        this.setState({data: newData});
        if (this.props.onChange) {
            this.props.onChange(newData);
        }
    },

    render() {
        return (
            <div className="InputBlock">
                <div className="InputBlock_header">
                    <strong>{this.props.ui.label}</strong>
                    <span>
                        <ToggleIconButton icon="fa-question-circle"
                            value={this.state.helpOpen}
                            toggle={!!this.props.ui.help}
                            onChange={this.helpToggled} />
                    </span>
                </div>
                <div className="InputBlock_input">
                    <table>
                        <tbody>
                            {Layouts(this.props.data, this.state.ui, this.valueChange) }
                        </tbody>
                    </table>
                </div>
                <div className={'InputBlock_help-box ' + (this.state.helpOpen ? '' : 'is-hidden')}>
                    {this.props.ui.help}
                </div>
            </div>
        );
    }
});
