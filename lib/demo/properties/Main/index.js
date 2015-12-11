require('font-awesome/css/font-awesome.css');
require('normalize.css');
require('../../../css/state.css');

var React = require('react'),
    ReactDOM = require('react-dom'),
    PropertyPanelBlock = require('../../../react/properties/'),
    DataInput = require('json!./data.json'),
    component = null;

var PropertyPanelDemo = React.createClass({
  getInitialState(){
    return {
      input: DataInput
    };
  },

  render() {
    return (
      <PropertyPanelBlock title="Matrix" input={this.state.input}/>
    );
  }
});

component = ReactDOM.render(<PropertyPanelDemo/>, document.querySelector('.content'));
