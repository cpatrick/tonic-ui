// Load the associated style
require('./style.css')

var React = require('react'),
    CollapsibleElement = require('../CollapsibleElement'),
    NumberInput = require('../NumberSliderControl'),
    LayerItem = require('./LayerItem');

export default React.createClass({

    propTypes: {
        model: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        this.attachListener(this.props.model);
        return { change: false, x: this.props.model.dimensions[0]/2, y: this.props.model.dimensions[1]/2 };
    },

    attachListener(model) {
        this.changeSubscription = model.onProbeChange((data, envelope) => {
            this.forceUpdate();
        });
    },

    detachListener() {
        if (this.changeSubscription) {
            this.changeSubscription.unsubscribe();
            this.changeSubscription = null;
        }
    },

    componentWillReceiveProps(nextProps) {
        var previous = this.props.model,
            next = nextProps.model;

        if(previous !== next) {
            this.detachListener();
            this.attachListener(next);

            // Force redraw
            this.setState( { change: !this.state.change });
        }
    },

    updateLight(event) {
        this.props.model.setLight(255 - event.target.value);
        this.setState( { change: !this.state.change });
    },

    onProbeChange(e) {
        var name = e.target.name,
            newVal = Number(e.target.value),
            newState = { x: this.state.x, y: this.state.y };

        newState[name] = newVal;
        this.setState(newState);
        this.props.model.getTimeChart(newState.x, newState.y);
    },

    toggleProbe(newVal) {
        this.props.model.getTimeProbe().enabled = !!newVal;

        if(this.props.model.getTimeProbe().enabled) {
            this.props.model.getTimeChart();
        }

        this.setState( { change: !this.state.change });

        this.props.model.getTimeProbe().triggerChange();
        this.props.model.render();
    },

    render() {
        var floatImageModel = this.props.model,
            timeProbe = floatImageModel.getTimeProbe(),
            width = floatImageModel.dimensions[0],
            height = floatImageModel.dimensions[1];
        return (
        <div className="FloatImageControl">
            <CollapsibleElement title="Scene">
                { floatImageModel.getLayers().map(function(item, idx) {
                    return <LayerItem key={idx} item={item} model={floatImageModel} />;
                })}
                <div className='FloatImageControl_item'>
                    <div className='FloatImageControl_item-label'>
                        Light
                    </div>
                    <div className='FloatImageControl_item-actions'>
                        <input type='range' min='0' max='128' value={255 - floatImageModel.getLight()} onChange={ this.updateLight }/>
                    </div>
                </div>
            </CollapsibleElement>
            <CollapsibleElement
                title="Time probe"
                open={timeProbe.enabled}
                subtitle={ timeProbe.enabled ? timeProbe.value : '' }
                visible={ floatImageModel.isMultiView() }
                onChange={ this.toggleProbe }>
                <div className='FloatImageControl_item'>
                    <div className='FloatImageControl_item-label'>
                        X
                    </div>
                    <div className='FloatImageControl_item-actions'>
                        <NumberInput
                            step={1} min={0.0} max={width}
                            key="x" value={this.state.x} name='x' onChange={this.onProbeChange}/>
                    </div>
                </div>
                <div className='FloatImageControl_item'>
                    <div className='FloatImageControl_item-label'>
                        Y
                    </div>
                    <div className='FloatImageControl_item-actions'>
                        <NumberInput
                            step={1} min={0.0} max={height}
                            key="y" value={this.state.y} name='y' onChange={this.onProbeChange}/>
                    </div>
                </div>
            </CollapsibleElement>
        </div>
        );
    }
});
