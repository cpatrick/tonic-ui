import BlockMixin       from '../BlockMixin';
import React            from 'react';
import ToggleIconButton from '../../widget/ToggleIconButton';

export default React.createClass({
    displayName: 'EnumProp',
    propTypes: {
        data: React.PropTypes.object.isRequired,
        help: React.PropTypes.string,
        name: React.PropTypes.string,
        onChange: React.PropTypes.func,
        ui: React.PropTypes.object.isRequired,
    },
    mixins: [BlockMixin],

    valueChange(e) {
        var newData = this.state.data;
        if (Array.isArray(this.state.data.value)) {
            const newVals = [];
            for (let i=0; i < e.target.options.length; i++) {
                const el = e.target.options.item(i);
                if (el.selected) {
                    newVals.push(el.value);
              }
            }
            newData.value = newVals;
        } else {
            newData.value = e.target.value;
        }

        this.setState({data: newData});
        if (this.props.onChange) {
            this.props.onChange(newData);
        }
    },

    render() {
        const mapper = () => {
                var ret = [];
                for (const key in this.props.ui.domain) {
                    ret.push( <option value={this.props.ui.domain[key]}
                        key={this.props.data.id + '_' + key}>
                            {key}
                        </option>
                    );
                }
                return ret;
            };
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
                    <select value={this.props.data.value} defaultValue={null}
                        onChange={this.valueChange} multiple={this.props.ui.size === -1}>
                        { mapper() }
                    </select>
                </div>
                <div className={'InputBlock_help-box ' + (this.state.helpOpen ? '' : 'is-hidden')}>
                    {this.props.ui.help}
                </div>
            </div>
        );
    },
});
