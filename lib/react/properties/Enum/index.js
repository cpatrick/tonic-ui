var React = require('react'),
    BlockMixin = require('../BlockMixin'),
    ToggleIconButton = require('../../widget/ToggleIconButton');

export default React.createClass({
    displayName: 'EnumProp',
    mixins: [BlockMixin],

    valueChange(e) {
        var newData = this.state.data;
        if (Array.isArray(this.state.data.value)) {
            var newVals = [];
            for (var i=0; i < e.target.options.length; i++) {
                var el = e.target.options.item(i);
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
        var _this = this,
            mapper = function() {
                var ret = [];
                for (var key in _this.props.ui.domain) {
                    ret.push( <option value={_this.props.ui.domain[key]}
                        key={_this.props.data.id + '_' + key}>
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
                    <select value={_this.props.data.value} defaultValue={null}
                        onChange={this.valueChange} multiple={this.props.ui.size === -1}>
                        { mapper() }
                    </select>
                </div>
                <div className={'InputBlock_help-box ' + (this.state.helpOpen ? '' : 'is-hidden')}>
                    {this.props.ui.help}
                </div>
            </div>
        );
    }
});
