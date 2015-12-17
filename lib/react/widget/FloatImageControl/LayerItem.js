import React from 'react';

export default React.createClass({

    propTypes: {
        item: React.PropTypes.object.isRequired,
        model: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return { change: false, dropDown: false };
    },

    toggleMesh() {
        if(this.props.item.hasMesh) {
            this.props.model.updateMaskLayerVisibility(this.props.item.name, !this.props.item.meshActive);
            this.setState({change: !this.state.change});
        }
    },

    toggleVisibility() {
        this.props.model.updateLayerVisibility(this.props.item.name, !this.props.item.active);
        this.setState({change: !this.state.change});
    },

    toggleDropDown() {
        if(this.props.item.arrays.length > 1) {
            this.setState({ dropDown: !this.state.dropDown });
        }
    },

    updateColorBy(event) {
        this.props.model.updateLayerColorBy(this.props.item.name, event.target.dataset.color);
        this.toggleDropDown();
    },

    render() {
        var model = this.props.model,
            layer = this.props.item,
            visible = layer.active,
            meshVisible = layer.meshActive,
            meshAvailable = layer.hasMesh,
            hasDropDown = layer.arrays.length > 1;

        return (
                <div className='FloatImageControl_item'>
                    <div className='FloatImageControl_item-label'>
                        { layer.name }
                    </div>
                    <div className='FloatImageControl_item-actions'>
                        <i className={ (meshAvailable ? '' : 'is-hidden ') + (meshVisible ? '' : 'fa-fw is-fade')} onClick={this.toggleMesh}>#</i>
                        <i className={'fa fa-fw fa-eye' + (visible ? '' : '-slash')} onClick={this.toggleVisibility}></i>
                        <i className={'fa fa-fw fa-tint ' + (hasDropDown ? '' : 'is-fade') } onClick={this.toggleDropDown}></i>
                        <div
                            onClick={ this.updateColorBy }
                            className={'FloatImageControl_item-colorBy_menu ' + (this.state.dropDown ? '' : 'is-hidden')}>
                            { layer.arrays.map(function(color) {
                                return <div key={color}
                                            data-color={color}
                                            className={'FloatImageControl_item-colorBy_item ' +  ( (color === layer.array) ? ' is-selected': '')} >{ color }
                                        </div>;
                            })}
                        </div>
                    </div>
                </div>);
    }

});
