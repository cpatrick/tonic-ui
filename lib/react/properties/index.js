require('./style.css');

import React    from 'react';
import factory  from './Factory';

export default React.createClass({

    displayName: 'InputPanel',

    propTypes: {
        input: React.PropTypes.array,
        labels: React.PropTypes.object,
        onChange: React.PropTypes.func,
        viewData: React.PropTypes.object,
    },

    getDefaultProps() {
        return { input: [] };
    },

    valueChange(newVal) {
        if (this.props.onChange) {
            this.props.onChange(newVal);
        }
    },

    render() {
        var viewData = this.props.viewData,
            uiContents = (content) => factory(content, viewData, this.valueChange),
            uiContainer = (property) => {
                return (<div key={property.title}>
                    <div className='prop-header'>
                        <strong>
                            {property.title}
                        </strong>
                    </div>
                    {property.contents.map(uiContents)}
                </div>);
            };
            
        return (
            <section className="property-panel">
                {this.props.input.map(uiContainer)}
            </section>
        );
    },
});