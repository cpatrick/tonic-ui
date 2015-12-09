require('./style.css');

var React = require('react');

export default React.createClass({

  propTypes: {
    value: React.PropTypes.string,
    classes: React.PropTypes.array
  },

  getInitialState() {
    return {
      editing: false,
      valueRep: this.props.value
    };
  },

  getDefaultProps() {
    return {
      value: '',
      classes: []
    };
  },

  valueChange(e) {
    var newVal = e.target.value;
    this.setState({editing: true, valueRep: newVal});
  },

  endEditing(){
    this.setState({editing: false});

    if (this.props.name){
        this.props.onChange(this.state.valueRep, this.props.name);
    } else {
        this.props.onChange(this.state.valueRep);
    }
  },

  render() {
    return (<div className={'TextInput ' + this.props.classes.join(' ')}>
              <input className='TextInput_entry'
                type="text"
                value={this.state.editing ? this.state.valueRep : this.props.value}
                onChange={this.valueChange}
                onBlur={this.endEditing} />
              <i className='TextInput_button fa fa-check' style={{ color: (this.state.editing ? '#000' : '#ccc') }}></i>
            </div>);
  }
});
