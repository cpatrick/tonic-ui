import React from 'react';

require('./style.css');

export default React.createClass({
  propTypes: {
    value: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    max: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    min: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    step: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    name: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  getInitialState() {
    return {value: this.props.value, max: this.props.max, min: this.props.min, step: this.props.step};
  },

  getDefaultProps() {
    return {value: 50, max: 100, min:0, step: 1};
  },

  valInput(e) {
    this.setState({value: e.target.value});
    if (this.props.onChange) {
      if (this.props.name) {
        e.target.name = this.props.name;
      }
      this.props.onChange(e);
    }
  },

  value(newVal) {
    if (arguments.length === 0) {
      return this.state.value;
    } else {
      newVal = Math.max(this.state.min, Math.min(newVal, this.state.max));
      this.setState({value: newVal});
    }
  },

  render(){
    var [min,max] = [this.props.min, this.props.max];
    return (
      <div className="NumberControlSlider">
        <input type="range"
          value={this.props.value}
          onChange={this.valInput}
          max={max} min={min}/>
        <input type="number"
          value={this.props.value}
          onChange={this.valInput}
          max={max} min={min}/>
      </div>
    );
  }
});