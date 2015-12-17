import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      open: false,
      field: this.props.field || this.props.fields[0]
    };
  },
  toggleDropdown() {
    this.setState({open: !this.state.open});
  },
  setField(e) {
    this.setState({field: e.target.innerHTML});
    this.props.onChange(e.target.innerHTML);
  },
  getField(e) {
    return this.state.field;
  },
  render() {
    return (
      <div className="Dropdown" onClick={ this.toggleDropdown }>
          {this.state.field}
          <ul className={this.state.open ? '' : 'is-hidden'}>
              { this.props.fields.map( (v) => {
                  if (v === '__internal') { //this pops up in there for some reason.
                    return;
                  } else if (v === this.state.field) {
                    return <li key={v} onClick={this.setField}><strong>{v}</strong></li>;
                  } else {
                    return <li key={v} onClick={this.setField}>{v}</li>;
                  }
              })}
          </ul>
      </div>
    );}
});
