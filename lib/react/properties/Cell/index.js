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
        onChange: React.PropTypes.func,
        show: React.PropTypes.func,
        ui: React.PropTypes.object.isRequired,
        viewData: React.PropTypes.object,
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
            <div className={"InputBlock " + (this.props.show(this.props.viewData) ? '' : 'is-hidden')}>
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
                <div className={'InputBlock_help-box ' + (this.state.helpOpen ? '' : 'is-hidden')}
                    dangerouslySetInnerHTML={{__html: this.props.ui.help}}/>
            </div>
        );
    },
});
