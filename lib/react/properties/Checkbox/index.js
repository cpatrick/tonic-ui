require('./style.css');

var React = require('react'),
    BlockMixin = require('../BlockMixin'),
    Checkbox = require('./Checkbox'),
    ToggleIconButton = require('../../widget/ToggleIconButton');

export default React.createClass({
    displayName: 'CheckboxProp',
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
        var _this = this,
            mapper = function() {
                if (Array.isArray(_this.props.data.value)) {
                    var ret = [];
                    for (var i=0; i < _this.props.data.value.length; i++) {
                        ret.push(
                            <Checkbox
                                value={!!_this.props.data.value[i]}
                                label={_this.props.ui.componentLabels[i]}
                                key={_this.props.data.id + '_' + i}
                                onChange={_this.valueChange} />                        );
                    }
                    return ret;
                } else {
                    return (<Checkbox
                        value={!!_this.props.data.value}
                        label={_this.props.ui.componentLabels[0]}
                        onChange={_this.valueChange} />);
                }

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
                    { mapper() }
                </div>
                <div className={'InputBlock_help-box ' + (this.state.helpOpen ? '' : 'is-hidden')}>
                    {this.props.ui.help}
                </div>
            </div>
        );
    }
});