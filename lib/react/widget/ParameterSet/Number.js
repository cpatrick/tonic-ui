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
 *       Expect the name of the argument this Number UI element control within the model.
 */
export default React.createClass({

  mixins: [ QueryDataModelDataListenerMixin, QueryDataModelDataListenerUpdateMixin ],

  propTypes: {
    model: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {slider: false, advanced: false, button: false};
  },

  previous() {
    if(this.props.model.previous(this.props.arg)) {
      this.props.model.lazyFetchData();
      ReactDOM.findDOMNode(this.refs.slider).focus();
    }
  },

  next() {
    if(this.props.model.next(this.props.arg)) {
      this.props.model.lazyFetchData();
      ReactDOM.findDOMNode(this.refs.slider).focus();
    }
  },

  first() {
    if(this.props.model.first(this.props.arg)) {
      this.props.model.lazyFetchData();
      ReactDOM.findDOMNode(this.refs.slider).focus();
    }
  },

  last() {
    if(this.props.model.last(this.props.arg)) {
      this.props.model.lazyFetchData();
      ReactDOM.findDOMNode(this.refs.slider).focus();
    }
  },

  onIndexChange(event) {
    if(this.props.model.setIndex(this.props.arg, Number(event.target.value))) {
      this.props.model.lazyFetchData();
    }
  },

  updateMode(event) {
    if(this.state.advanced !== event.altKey) {
      this.setState({ advanced: event.altKey });
    }
  },

  resetState(event) {
    this.setState({ advanced : false });
  },

  enableButtons(event) {
    this.setState({ button : true });
    ReactDOM.findDOMNode(this.refs.slider).focus();
  },

  disableButtons() {
    this.setState({ button : false, advanced : false });
  },

  grabFocus() {
    ReactDOM.findDOMNode(this.refs.slider).focus();
  },

  toggleAnimation() {
    this.props.model.toggleAnimationFlag(this.props.arg);
    this.setState({});
  },

  render() {
    return (
        <div
          className={ (this.props.model.getAnimationFlag(this.props.arg) ? 'is-active ' : '') + 'QueryDataModelWidget__item'}
          onKeyDown={this.updateMode}
          onKeyUp={this.resetState}
          onMouseLeave={this.disableButtons}>
          <div className='QueryDataModelWidget__item-row'>
            <div className='QueryDataModelWidget__item-label' onClick={this.toggleAnimation}>
              { this.props.model.label(this.props.arg) }
            </div>
            <div className="mobile-only">
              { this.props.model.getValue(this.props.arg) }
            </div>
            <div className='QueryDataModelWidget__item-control non-mobile'
              onMouseEnter={this.enableButtons}
              onMouseLeave={this.disableButtons}>
                <div className={ (this.state.button ? 'is-hidden ': '') }>
                  { this.props.model.getValue(this.props.arg) }
                </div>
                <i
                  className={ (this.state.advanced ? 'fa-step-backward' : 'fa-minus') + (this.state.button ? '' : ' is-hidden ') + ' fa'}
                  onClick={ this.state.advanced ? this.first : this.previous } ></i>
                <i
                  className={ (this.state.advanced ? 'fa-step-forward'  : 'fa-plus')  + (this.state.button ? '' : ' is-hidden ') + ' fa'}
                  onClick={ this.state.advanced ? this.last : this.next } ></i>
            </div>
          </div>
          <div className='QueryDataModelWidget__item-row mobile-only'>
            <div className='QueryDataModelWidget__item-control'>
                <br />
                <i
                  className={ 'fa fa-step-backward' }
                  onClick={ this.first } ></i>
                <i
                  className={ 'fa fa-step-forward' }
                  onClick={ this.last } ></i>
                <i
                  className={ 'fa fa-minus' }
                  onClick={ this.previous } ></i>
                <i
                  className={ 'fa fa-plus' }
                  onClick={ this.next } ></i>
            </div>
          </div>
          <div className='QueryDataModelWidget__item-row'>
            <div className='QueryDataModelWidget__item-slider' onMouseEnter={this.grabFocus}>
                <input
                  ref='slider'
                  type='range'
                  min='0'
                  max={ this.props.model.getSize(this.props.arg) - 1 }
                  value={ this.props.model.getIndex(this.props.arg) }
                  onChange={ this.onIndexChange } />
            </div>
          </div>
        </div>
    );
  }
});
