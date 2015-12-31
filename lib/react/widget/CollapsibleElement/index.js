import React from 'react';

require('./style.css');

export default React.createClass({

  displayName: 'CollapsibleElement',

  propTypes: {
    children: React.PropTypes.array,
    onChange: React.PropTypes.func,
    open: React.PropTypes.bool,
    subtitle: React.PropTypes.oneOfType([ React.PropTypes.object, React.PropTypes.string ]),
    title: React.PropTypes.string,
    visible: React.PropTypes.bool,
  },
  
  getDefaultProps(){
    return { title: "", subtitle: "", open: true, visible: true };
  },

  getInitialState(){
    return { open: this.props.open };
  },

  toggleOpen() {
    var newState = !this.state.open;
    this.setState({open: newState});

    if(this.props.onChange) {
      this.props.onChange(newState);
    }
  },

  isCollapsed() {
    return this.state.open === false;
  },

  isExpanded() {
    return this.state.open === true;
  },

  render() {
    var style = {};
    if(!this.props.visible) {
      style.display = 'none';
    }
    return (
      <section className="CollapsibleElement" style={style}>
        <div className="CollapsibleElement_header">
          <div className="clickable-area" onClick={ this.toggleOpen }>
            <i className={(this.state.open ? '' : 'closed ') + 'fa fa-fw fa-caret-down'}></i>
            <strong>{this.props.title}</strong>
          </div>
          <span>{this.props.subtitle}</span>
        </div>

        <div className={this.state.open ? 'CollapsibleElement_content' : 'CollapsibleElement_content is-hidden'}>
          {this.props.children}
        </div>
      </section>
    );
  },
});
