import CollapsibleElement   from '../CollapsibleElement';
import CoordinateControl    from '../CoordinateControl';
import LightButton          from '../ToggleIconButton';
import NumberInput          from '../NumberInput';
import React                from 'react';

// Load CSS
require('./style.css');

export default React.createClass({

    displayName: 'LightProperties',

    propTypes: {
        light: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return this.props.light.getLightProperties().lightTerms;
    },

    onLightTermsChange(newVal, name) {
        var newState = {};
        newState[name] = newVal;
        this.setState(newState);
        setImmediate(() => {
            this.props.light.setLightProperties({lightTerms: newState});
        });
    },

    onLightPositionChange(event) {
        this.props.light.setLightProperties({
            'lightPosition': event,
        });
    },

    toggleLight(enabled) {
        this.props.light.setLightingEnabled(enabled);
    },

    render() {
        var lightButton = <LightButton key='enable-light-button' onChange={this.toggleLight} value={this.props.light.getLightingEnabled()}/>;
        return (
            <CollapsibleElement title="Light Properties" subtitle={lightButton}>
                <section className="LightProperties__container">
                <CoordinateControl onChange={this.onLightPositionChange} width={114} height={114} hideXY/>
                    <section className="LightProperties__controls">
                        <div className="LightProperties__inputRow">
                            <label>Ambient</label><NumberInput classes={['LightProperty']} step={0.05} min={0.0} max={1.0}
                                key="ka" value={this.state.ka} name='ka' onChange={this.onLightTermsChange}/>
                        </div>
                        <div className="LightProperties__inputRow">
                            <label>Diffuse</label><NumberInput classes={['LightProperty']} step={0.05} min={0.0} max={1.0}
                                key="kd" value={this.state.kd} name='kd' onChange={this.onLightTermsChange}/>
                        </div>
                        <div className="LightProperties__inputRow">
                            <label>Specular</label><NumberInput classes={['LightProperty']} step={0.05} min={0.0} max={1.0}
                                key="ks" value={this.state.ks} name='ks' onChange={this.onLightTermsChange}/>
                        </div>
                        <div className="LightProperties__inputRow">
                            <label>Alpha</label><NumberInput classes={['LightProperty']} step={1} min={0.0} max={100}
                                key="alpha" value={this.state.alpha} name='alpha' onChange={this.onLightTermsChange}/>
                        </div>
                    </section>
                </section>
            </CollapsibleElement>
        );
    },
});
