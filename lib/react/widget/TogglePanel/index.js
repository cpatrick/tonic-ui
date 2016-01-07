import React from 'react';

// Load CSS
require('./style.css');

export default React.createClass({

    displayName: 'TogglePanel',

    propTypes: {
        anchor: React.PropTypes.array,
        panelVisible: React.PropTypes.bool,
        position: React.PropTypes.array,
        size: React.PropTypes.object,
    },

    getDefaultProps() {
        return {
            anchor: ['top', 'right'],
            children: [],
            panelVisible: false,
            position: ['top', 'left'],
            size: { button: [ '2em', '2em' ], panel: [ '400px' ]},
        };
    },

    getInitialState() {
        return {
            panelVisible: this.props.panelVisible,
        };
    },

    componentWillReceiveProps(nextProps) {
        if(nextProps.value !== this.state.enabled) {
            this.setState({enabled: nextProps.value});
        }
    },

    togglePanel() {
        const panelVisible = !this.state.panelVisible;
        this.setState({panelVisible});
    },

    render() {
        const buttonAnchor = ' ' + this.props.anchor.join(' '),
            panelAnchor = ' ' + this.props.position.join(' ');
        return (<div className='TogglePanel' style={{ width: this.props.size.button[0], height: this.props.size.button[1] }}>
                    <span className={'fa fa-toggle-' + ( this.state.panelVisible ? 'on': 'off') } style={{ width: this.props.size.button[0], height: this.props.size.button[1] }} onClick={ this.togglePanel }></span>
                    <div className={ 'TogglePanel_button' + buttonAnchor }>
                        <div className={ 'TogglePanel_content' + panelAnchor } style={{display: this.state.panelVisible ? 'block' : 'none', width: this.props.size.panel[0] }}>
                            { this.props.children }
                        </div>
                    </div>
                </div>);
    },
});
