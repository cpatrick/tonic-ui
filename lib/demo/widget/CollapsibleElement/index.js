require('font-awesome/css/font-awesome.css');

var React = require('react'),
    ReactDOM = require('react-dom'),
    CollapsibleElement = require('../../../react/widget/CollapsibleElement'),
    component = null;

var AccordionControl = React.createClass({
  render() {
  	var mainStyle = {
  		border: '1px solid grey'
  	};
    return (
      <main style={mainStyle}>
        <CollapsibleElement title="Charmander" subtitle="stage 1">
        	<img src="http://media.giphy.com/media/Rs8APEp9KGBjy/giphy.gif" />
        </CollapsibleElement>
        <CollapsibleElement title="Charmeleon" subtitle="stage 2" open={false}>
        	<img src="http://media.giphy.com/media/ijnAEnJI6oZG0/giphy.gif" />
        </CollapsibleElement>
        <CollapsibleElement title="Charizard" subtitle="final form" open={false}>
        	<img src="http://media.giphy.com/media/11sXoLLZGXwcvu/giphy.gif" />
        </CollapsibleElement>
      </main>
    );
  }
});

component = ReactDOM.render(<AccordionControl/>, document.querySelector('.content'));
