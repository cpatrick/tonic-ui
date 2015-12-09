
var React = require('react'),
    CollapsibleElement = require('../CollapsibleElement'),
    LookupTableWidget = require('../LookupTable'),
    EqualizerWidget = require('../Equalizer'),
    LightButton = require('../ToggleIconButton'),
    NumberInput = require('../NumberInput');

export default React.createClass({

    propTypes: {
        equalizer: React.PropTypes.object.isRequired,
        lookupTable: React.PropTypes.object.isRequired,
        computation: React.PropTypes.object.isRequired
    },

    componentWillMount() {
        this.equalizerSubscription = this.props.equalizer.onChange( () => {
            this.forceUpdate();
        });
        this.intensitySubscription = this.props.intensity.onChange( () => {
            this.forceUpdate();
        });
        this.computationSubscription = this.props.intensity.onChange( () => {
            this.forceUpdate();
        });
    },

    componentWillUnmount() {
        if(this.equalizerSubscription) {
            this.equalizerSubscription.unsubscribe();
            this.equalizerSubscription = null;
        }
        if(this.intensitySubscription) {
            this.intensitySubscription.unsubscribe();
            this.intensitySubscription = null;
        }
        if(this.computationSubscription) {
            this.computationSubscription.unsubscribe();
            this.computationSubscription = null;
        }
    },

    render() {
        var equalizer = this.props.equalizer,
            lut = this.props.lookupTable,
            intensityButton = <LightButton
                                    key='toggle-intensity'
                                    onChange={ this.props.intensity.toggleState }
                                    value={ this.props.intensity.getState() }/>,
            resetOpacityButton = <LightButton
                                    key='reset'
                                    icon='fa-undo'
                                    toggle={false}
                                    onChange={ this.props.equalizer.resetOpacities }
                                    value={true}/>,
            cpuGpuButton = <LightButton
                                    key='toggle-gpu'
                                    icon='fa-mobile'
                                    onChange={ this.props.computation.toggleState }
                                    value={ !this.props.computation.getState() }/>;
        return (
            <div>
                <CollapsibleElement title="LookupTable" key='LookupTableWidget_parent' subtitle={intensityButton}>
                        <LookupTableWidget
                            key='LookupTableWidget'
                            ref='LookupTableWidget'
                            originalRange={ lut.originalRange }
                            lut={ lut.lookupTable }
                            lutManager={ lut.lookupTableManager }
                        />
                </CollapsibleElement>
                <CollapsibleElement title="Opacity Control" subtitle={[cpuGpuButton, resetOpacityButton]}>
                      <EqualizerWidget
                        ref='EqualizerWidget'
                        key='Equalizer'
                        layers={ equalizer.getOpacities() }
                        onChange={ equalizer.updateOpacities }
                        colors={ equalizer.getColors() }
                        spacing={5} />
                </CollapsibleElement>
            </div>
        );
    }
});
