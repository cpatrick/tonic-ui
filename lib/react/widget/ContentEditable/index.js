import React    from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({

    displayName: 'ContentEditable',

    propTypes: {
        html: React.PropTypes.string,
        onChange: React.PropTypes.func,
    },

    shouldComponentUpdate(nextProps) {
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    },

    componentDidUpdate() {
        if ( this.props.html !== ReactDOM.findDOMNode(this).innerHTML ) {
           ReactDOM.findDOMNode(this).innerHTML = this.props.html;
        }
    },

    emitChange(evt) {
        var html = ReactDOM.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            evt.target = { value: html };
            this.props.onChange(evt);
        }
        this.lastHtml = html;
    },

    /* eslint-disable react/no-danger */
    render() {
        return <div className="ContentEditable"
            onInput={this.emitChange}
            onBlur={this.emitChange}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
    },
    /* eslint-enable react/no-danger */
});
