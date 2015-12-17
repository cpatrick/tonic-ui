import React from 'react';

// Load CSS
require('./style.css');

export default React.createClass({

  propTypes: {
    classes: React.PropTypes.array,
    value: React.PropTypes.bool,
    icon: React.PropTypes.string,
    toggle: React.PropTypes.bool,
    onChange: React.PropTypes.func
  },

  getInitialState() {
    return {
      enabled: this.props.value
    };
  },

  getDefaultProps() {
    return {
      classes: [],
      value: true,
      icon: 'fa-sun-o',
      toggle: true
    };
  },

  buttonClicked(e) {
    var enabled = this.props.toggle ? !this.state.enabled : this.state.enabled;
    if (this.props.onChange) {
      this.props.onChange(enabled);
    }
    if(this.props.toggle) {
      this.setState({enabled});
    }
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.state.enabled) {
        this.setState({enabled: nextProps.value});
    }
  },

  render() {
    var classList = ['ToggleIconButton', 'fa', 'fa-fw', this.props.icon].concat(this.props.classes);
    classList.push((this.state.enabled || this.props.alwaysOn) ? ' is-enabled' : ' is-disabled');
    return (
        <i className={classList.join(' ')} onClick={this.buttonClicked} /> );
  }
});
