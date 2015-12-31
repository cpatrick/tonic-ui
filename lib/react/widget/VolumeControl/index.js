import CollapsibleElement   from '../CollapsibleElement';
import EqualizerWidget      from '../Equalizer';
import LightButton          from '../ToggleIconButton';
import LookupTableWidget    from '../LookupTable';
import React                from 'react';

export default React.createClass({

    displayName: 'VolumeControl',

    propTypes: {
        computation: React.PropTypes.object.isRequired,
        equalizer: React.PropTypes.object.isRequired,
        intensity: React.PropTypes.object,
        lookupTable: React.PropTypes.object.isRequired,
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
                                    value/>,
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
    },
});
