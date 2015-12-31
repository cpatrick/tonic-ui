import CollapsibleElement   from '../CollapsibleElement';
import Layouts              from './Layouts';
import React                from 'react';

require('./style.css');

/**
 * This React component expect the following input properties:
 *   - renderer:
 *       Expect a MultiViewRenderer instance.
 */
export default React.createClass({

    displayName: 'MultiViewControl',

    propTypes: {
        renderer: React.PropTypes.object,
    },

    getInitialState() {
        return {
            renderMethod: '',
            layout: '',
        };
    },

    componentWillReceiveProps(nextProps) {
        if(!this.props.renderer && nextProps.renderer) {
            const renderer = nextProps.renderer;
            this.layoutSubscription = renderer.onLayoutChange(this.onLayoutChangeCallback);
            this.renderMethodSubscription = renderer.onActiveViewportChange(this.onActiveViewportCallback);
            this.setState({renderMethod: renderer.getActiveRenderMethod(), layout: renderer.getActiveLayout()});
        }
    },

    componentWillUnmount() {
        if(this.layoutSubscription) {
            this.layoutSubscription.unsubscribe();
            this.layoutSubscription = null;
        }
        if(this.renderMethodSubscription) {
            this.renderMethodSubscription.unsubscribe();
            this.renderMethodSubscription = null;
        }
    },

    onLayoutChange(layout) {
        this.props.renderer.setLayout(layout);
    },

    onRenderMethodChange(event) {
        var renderMethod = event.target.value;
        this.props.renderer.setRenderMethod(renderMethod);
    },

    onLayoutChangeCallback(data, envelope) {
        this.setState({layout: data});
    },

    onActiveViewportCallback(data, envelope) {
        this.setState({renderMethod: data.name});
    },

    render() {
        var renderer = this.props.renderer,
            renderMethods = [];

        if (renderer) {
            renderer.getRenderMethods().map(function(v) {
                renderMethods.push(<option key={v} value={v}>{v}</option>);
            });
        }
        return (
            <div className='MultiViewRendererControl'>
                <CollapsibleElement title="Layout">
                  <Layouts onChange={this.onLayoutChange} />
                </CollapsibleElement>
                <CollapsibleElement title="Viewport">
                  <select
                      style={{width: '100%'}}
                      ref='select'
                      value={ this.state.renderMethod }
                      onChange={ this.onRenderMethodChange } >
                      { renderMethods }
                  </select>
                </CollapsibleElement>
            </div>
        );
    },
});
