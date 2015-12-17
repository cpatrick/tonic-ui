import CollapsibleElement from '../CollapsibleElement';
import React              from 'react';
import TextInput          from '../TextInput';

export default React.createClass({

  propTypes: {
    operator: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      operation: this.props.operator.getOperation()
    };
  },

  updateOperation(operation) {
    this.setState({operation});
    this.props.operator.setOperation(operation);
  },

  componentWillReceiveProps(nextProps) {
    if(this.state.operation !== nextProps.operator.getOperation()) {
      this.setState({operation: nextProps.operator.getOperation()});
    }
  },

  render() {
    return <CollapsibleElement title='Pixel Operation'>
                <TextInput value={ this.state.operation } onChange={ this.updateOperation }/>
           </CollapsibleElement>;
  }
});
