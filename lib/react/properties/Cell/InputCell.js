var React = require('react');

export default React.createClass({
  propTypes: {
    idx: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
    label: React.PropTypes.string,
    domain: React.PropTypes.object
  },

  getInitialState() {
    return {
      editing: false,
      valueRep: this.props.value
    };
  },

  getDefaultProps() {
    return {label: '', idx: 0, value: '', type: 'string'};
  },

  valueChange(e) {
    var newVal = e.target.value;
    this.setState({editing: true, valueRep: newVal});

    if (this.validateInput(newVal)) {
      var propVal = this.castInput(newVal);
      if (this.props.type === 'int' || this.props.type === 'double') {
        propVal = this.clamp(propVal);
      }
      this.props.onChange(this.props.idx, propVal);
    }
  },

  validateInput(val) {
    switch (this.props.type) {
      case 'int':
        var testVal = parseInt(val, 10);
        return Number.isInteger(testVal);

      case 'double':
        var testVal = parseFloat(val);
        return !isNaN(testVal);

      case 'string':
        return typeof val === 'string' || val instanceof String;

      case 'bool':
        return typeof val === 'boolean';

      default:
        return false;
    }
  },

  castInput(val) {
    switch (this.props.type) {
      case 'int':
        return parseInt(val, 10);

      case 'double':
        return parseFloat(val);

      case 'string':
        return val;

      case 'bool':
        return Boolean(val);

      default:
        return null;
    }
  },

  clamp(val) {
    if (this.props.domain.hasOwnProperty('min')) {
      val = Math.max(this.props.domain.min, val);
    }
    if (this.props.domain.hasOwnProperty('max')) {
      val = Math.min(this.props.domain.max, val);
    }
    return val;
  },

  endEditing(){
    this.setState({editing: false});
  },

  render() {
    return (
      <td className="InputCell">
        <label className="InputCell_label">{this.props.label}</label>
        <input className="InputCell_input"
          value={this.state.editing ? this.state.valueRep : this.props.value}
          onChange={this.valueChange}
          onBlur={this.endEditing}></input>
      </td>);
  }
});