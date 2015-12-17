import React from 'react';

require('./style.css');

export default React.createClass({

  propTypes: {
    list: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func
  },

  processItem(event) {
    var name = event.target.name,
      array = this.props.list,
      count = array.length;

    if(this.props.onChange) {
      while(count--) {
        if(array[count].name === name) {
          this.props.onChange(count, array);
        }
      }
    }
  },

  render() {
    var list = [];

    this.props.list.forEach((item) => {
      list.push(<button key={item.name} name={item.name} onClick={this.processItem}>{item.name}</button>);
    })

    return <section className="ButtonSelector">{ list }</section>;
  }
});
