import React from 'react';

export default React.createClass({

  displayName: 'NumberInput',

  propTypes: {
    classes: React.PropTypes.array,
    max: React.PropTypes.oneOfType([ React.PropTypes.number, React.PropTypes.string ]),
    min: React.PropTypes.oneOfType([ React.PropTypes.number, React.PropTypes.string ]),
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    step: React.PropTypes.oneOfType([ React.PropTypes.number, React.PropTypes.string ]),
    value: React.PropTypes.oneOfType([ React.PropTypes.number, React.PropTypes.string ]),
  },
  
  getDefaultProps() {
    return {
      step: 1,
      value: 0,
      classes: [],
    };
  },

  getInitialState() {
    return {
      editing: false,
      valueRep:this.props.value,
    };
  },

  valueChange(e) {
    var newVal = e.target.value;
    this.setState({editing: true, valueRep: newVal});

    const propVal = parseFloat(newVal);
    if (!isNaN(propVal) && this.props.onChange) {
      if (this.props.name){
        this.props.onChange(propVal, this.props.name);
      }
      else {
        this.props.onChange(propVal);
      }
    }
  },

  endEditing(){
    this.setState({editing: false});
  },

  render() {
    return (
      <input className={'NumberInput ' + this.props.classes.join(' ') }
        type="number"
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}
        value={this.state.editing ? this.state.valueRep : this.props.value}
        onChange={this.valueChange}
        onBlur={this.endEditing} /> );
  },
});