// Load the associated style
require('./style.css')

var React = require('react'),
    RootItem = require('./RootItem');

/**
 * This React component expect the following input properties:
 *   - model:
 *       Expect a CompositePipelineModel instance.
 */
export default React.createClass({

    propTypes: {
        model: React.PropTypes.object.isRequired
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

    componentWillReceiveProps(nextProps) {
        var previous = this.props.model,
            next = nextProps.model;

        if(previous !== next) {
            this.detachListener();
            this.attachListener(next);
        }
    },

    componentDidMount() {
        this.attachListener(this.props.model);
    },

    // Auto unmount listener
    componentWillUnmount() {
        this.detachListener();
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
    }
});
