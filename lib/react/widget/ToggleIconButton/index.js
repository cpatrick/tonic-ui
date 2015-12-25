import React from 'react';

// Load CSS
require('./style.css');

export default React.createClass({

  displayName: 'ToggleIconButton',

  propTypes: {
    alwaysOn: React.PropTypes.bool,
    classes: React.PropTypes.array,
    icon: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    toggle: React.PropTypes.bool,
    value: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classes: [],
      value: true,
      icon: 'fa-sun-o',
      toggle: true,
      name: 'toggle-button',
    };
  },

  getInitialState() {
    return {
      enabled: this.props.value,
    };
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.state.enabled) {
        this.setState({enabled: nextProps.value});
    }
  },

  buttonClicked() {
    var enabled = this.props.toggle ? !this.state.enabled : this.state.enabled;
    if (this.props.onChange) {
      this.props.onChange(enabled, this.props.name);
    }
    if(this.props.toggle) {
      this.setState({enabled});
    }
  },

  render() {
    var classList = ['ToggleIconButton', 'fa', 'fa-fw', this.props.icon].concat(this.props.classes);
    classList.push((this.state.enabled || this.props.alwaysOn) ? ' is-enabled' : ' is-disabled');
    return (
        <i className={classList.join(' ')} onClick={this.buttonClicked} /> );
  },
});
