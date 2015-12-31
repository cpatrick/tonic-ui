import BlockMixin       from '../BlockMixin';
import layouts          from './Layouts';
import React            from 'react';
import ToggleIconButton from '../../widget/ToggleIconButton';

require('./style.css');

export default React.createClass({
    displayName: 'CellProp',
    propTypes: {
        data: React.PropTypes.object.isRequired,
        help: React.PropTypes.string,
        name: React.PropTypes.string,
        onChange: React.PropTypes.func,
        ui: React.PropTypes.object.isRequired,
    },
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
                            { layouts(this.props.data, this.state.ui, this.valueChange) }
                        </tbody>
                    </table>
                </div>
                <div className={'InputBlock_help-box ' + (this.state.helpOpen ? '' : 'is-hidden')}>
                    {this.props.ui.help}
                </div>
            </div>
        );
    },
});
