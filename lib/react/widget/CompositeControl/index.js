import React    from 'react';
import RootItem from './RootItem';

// Load the associated style
require('./style.css')

/**
 * This React component expect the following input properties:
 *   - model:
 *       Expect a CompositePipelineModel instance.
 */
export default React.createClass({

    displayName: 'CompositeControl',

    propTypes: {
        model: React.PropTypes.object.isRequired,
    },

    componentDidMount() {
        this.attachListener(this.props.model);
    },

    componentWillReceiveProps(nextProps) {
        var previous = this.props.model,
            next = nextProps.model;

        if(previous !== next) {
            this.detachListener();
            this.attachListener(next);
        }
    },

    // Auto unmount listener
    componentWillUnmount() {
        this.detachListener();
    },

     attachListener(pipelineModel) {
        this.pipelineSubscription = pipelineModel.onChange((data, envelope) => {
            this.forceUpdate();
        });
    },

    detachListener() {
        if (this.pipelineSubscription) {
            this.pipelineSubscription.unsubscribe();
            this.pipelineSubscription = null;
        }
    },

    render() {
        var pipelineModel = this.props.model,
            pipelineDescription = pipelineModel.getPipelineDescription();
        return (
            <div className='CompositePipeline'>
                { pipelineDescription.map(function(item, idx) {
                    return <RootItem key={idx} item={item} layer={item.ids.join('')} model={pipelineModel} />;
                })}
            </div>
        );
    },
});
