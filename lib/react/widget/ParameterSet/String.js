var React = require('react'),
    ReactDOM = require('react-dom'),
    QueryDataModelDataListenerMixin = require('./QueryDataModelDataListenerMixin'),
    QueryDataModelDataListenerUpdateMixin = require('./QueryDataModelDataListenerUpdateMixin');

/**
 * This React component expect the following input properties:
 *   - model:
 *       Expect a QueryDataModel instance.
 *   - listener:
 *       Expect a Boolean based on the automatic data model registration for listening.
 *       Default value is true but that should be false is nested.
 *   - arg:
 *       Expect the name of the argument this String UI element control within the model.
 */
export default React.createClass({

  mixins: [QueryDataModelDataListenerMixin, QueryDataModelDataListenerUpdateMixin],

  handleChange(event) {
    if(this.props.model.setValue(this.props.arg, event.target.value)) {
      this.props.model.lazyFetchData();
    }
  },

  grabFocus() {
    ReactDOM.findDOMNode(this.refs.select).focus();
  },

  toggleAnimation() {
    this.props.model.toggleAnimationFlag(this.props.arg);
    this.setState({});
  },

  render() {
    return (
      <div className={ (this.props.model.getAnimationFlag(this.props.arg) ? 'is-active ' : '') + 'QueryDataModelWidget__item'}>
        <div className='QueryDataModelWidget__item-row QueryDataModelWidget__item-label' onClick={this.toggleAnimation}>
          { this.props.model.label(this.props.arg) }
        </div>
        <div className='QueryDataModelWidget__item-row' onMouseEnter={this.grabFocus}>
            <select
                ref='select'
                value={ this.props.model.getValue(this.props.arg) }
                onChange={ this.handleChange } >
            { this.props.model.getValues(this.props.arg).map(function(v) {
              return <option key={v} value={v}>{v}</option>;
            })}
            </select>
        </div>
      </div>
    );
  }

});