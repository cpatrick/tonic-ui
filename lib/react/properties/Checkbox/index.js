import BlockMixin       from '../BlockMixin';
import Checkbox         from './Checkbox';
import React            from 'react';
import ToggleIconButton from '../../widget/ToggleIconButton';

require('./style.css');

export default React.createClass({
    displayName: 'CheckboxProp',
    propTypes: {   
        data: React.PropTypes.object.isRequired,
        help: React.PropTypes.string,
        name: React.PropTypes.string,
        onChange: React.PropTypes.func,
        show: React.PropTypes.func,
        ui: React.PropTypes.object.isRequired,
        viewData: React.PropTypes.object,
    },
    mixins: [BlockMixin],

    valueChange(idx, newVal) {
        var newData = this.state.data;
        if (idx === null) {
            newData.value = newVal;
        } else {
            newData.value[idx] = newVal;
        }
        this.setState({data: newData});
        if (this.props.onChange) {
            this.props.onChange(newData);
        }
    },

    render() {
        const mapper = () => {
                if (Array.isArray(this.props.data.value)) {
                    const ret = [];
                    for (let i=0; i < this.props.data.value.length; i++) {
                        ret.push(
                            <Checkbox
                                value={!!this.props.data.value[i]}
                                label={this.props.ui.componentLabels[i]}
                                key={this.props.data.id + '_' + i}
                                onChange={this.valueChange} />                        );
                    }
                    return ret;
                } 
                
                return (<Checkbox
                            value={!!this.props.data.value}
                            label={this.props.ui.componentLabels[0]}
                            onChange={this.valueChange} />);
            };
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
                    { mapper() }
                </div>
                <div className={'InputBlock_help-box ' + (this.state.helpOpen ? '' : 'is-hidden')}
                    dangerouslySetInnerHTML={{__html: this.props.ui.help}}/>
            </div>
        );
    },
});