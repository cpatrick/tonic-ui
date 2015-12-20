var React = require('react'),
    BlockMixin = require('../BlockMixin'),
    Slider = require('./Slider'),
    ToggleIconButton = require('../../widget/ToggleIconButton');

export default React.createClass({
    displayName: 'SliderProp',
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
                        var step = (_this.props.ui.type && _this.props.ui.type.toLowerCase() === 'double' ? 0.1 : 1);
                        ret.push(
                            <Slider value={_this.props.data.value[i]}
                                min={_this.props.ui.domain.min}
                                max={_this.props.ui.domain.max}
                                step={step} //int 1, double 0.1
                                idx={i}
                                onChange={_this.valueChange}
                                key={_this.props.data.id + '_' + i}/>
                        );
                    }
                    return ret;
                } else {
                    var step = (_this.props.ui.type && _this.props.ui.type.toLowerCase() === 'double' ? 0.1 : 1);
                    return (<Slider value={_this.props.data.value}
                        min={_this.props.ui.domain.min}
                        max={_this.props.ui.domain.max}
                        step={step}
                        onChange={_this.valueChange}/>);
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
