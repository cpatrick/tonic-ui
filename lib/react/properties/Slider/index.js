var React = require('react'),
    BlockMixin = require('../BlockMixin'),
    Slider = require('./Slider'),
    ToggleIconButton = require('../../widget/ToggleIconButton');

export default React.createClass({
    displayName: 'SliderProp',
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
                        const step = (this.props.ui.type && this.props.ui.type.toLowerCase() === 'double' ? 0.1 : 1);
                        ret.push(
                            <Slider value={this.props.data.value[i]}
                                min={this.props.ui.domain.min}
                                max={this.props.ui.domain.max}
                                step={step} //int 1, double 0.1
                                idx={i}
                                onChange={this.valueChange}
                                key={this.props.data.id + '_' + i}/>
                        );
                    }
                    return ret;
                } 

                const step = (this.props.ui.type && this.props.ui.type.toLowerCase() === 'double' ? 0.1 : 1);
                return (<Slider value={this.props.data.value}
                        min={this.props.ui.domain.min}
                        max={this.props.ui.domain.max}
                        step={step}
                        onChange={this.valueChange}/>);
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
    },
});
