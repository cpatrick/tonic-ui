import ChildItem from './ChildItem';
import React     from 'react';

/**
 * This React component expect the following input properties:
 *   - model:
 *       Expect a LokkupTable instance that you want to render and edit.
 *   - item:
 *       Root of the tree
 *   - layer:
 *       Layer id.
 */
export default React.createClass({

    displayName: 'CompositeControl.RootItem',

    propTypes: {
        item: React.PropTypes.object,
        layer: React.PropTypes.string,
        model: React.PropTypes.object,
    },

    getInitialState() {
        return { dropDown: false };
    },

    toggleVisibility() {
        this.props.model.toggleLayerVisible(this.props.layer);
    },

    toggleDropDown() {
        if(this.props.model.getColor(this.props.layer).length > 1) {
            this.setState({ dropDown: !this.state.dropDown });
        }
    },

    updateColorBy(event) {
        this.props.model.setActiveColor(this.props.layer, event.target.dataset.color);
        this.toggleDropDown();
    },

    toggleEditMode() {
        this.props.model.toggleEditMode(this.props.layer);
    },

    updateOpacity(e) {
        this.props.model.setOpacity(this.props.layer, e.target.value);
        this.forceUpdate();
    },

    render() {
        var model = this.props.model,
            layer = this.props.layer,
            visible = model.isLayerVisible(this.props.layer),
            children = (this.props.item.children || []),
            inEditMode = this.props.model.isLayerInEditMode(this.props.layer),
            hasChildren = (children.length > 0),
            hasOpacity = model.hasOpacity(),
            hasDropDown = this.props.model.getColor(this.props.layer).length > 1,
            editButton = hasChildren ? <i className={'fa fa-fw fa-pencil ' + ( inEditMode ? '' : 'is-fade')} onClick={this.toggleEditMode}></i> : '';

        return (
            <div className='CompositePipeline_section'>
                <div className='CompositePipeline_item'>
                    <div className='CompositePipeline_item-label'>
                        { this.props.item.name }
                    </div>
                    <div className='CompositePipeline_item-actions'>
                        { editButton }
                        <i className={'fa fa-fw fa-eye' + (visible ? '' : '-slash')} onClick={this.toggleVisibility}></i>
                        <i className={'fa fa-fw fa-tint ' + (hasDropDown ? '' : 'is-fade') } onClick={this.toggleDropDown}></i>
                        <div
                            onClick={ this.updateColorBy }
                            className={'CompositePipeline_item-colorBy_menu ' + (this.state.dropDown ? '' : 'is-hidden')}>
                            { model.getColor(layer).map(function(color) {
                                return <div key={color} data-color={color}
                                            className={'CompositePipeline_item-colorBy_item ' + (model.isActiveColor(layer, color) ? ' is-selected': '')} >
                                            { model.getColorToLabel(color) }
                                        </div>;
                            })}
                        </div>
                    </div>
                </div>
                <div className={ (hasOpacity && !hasChildren) ? 'CompositePipeline_item' : 'is-hidden'}>
                    <input className='CompositePipeline_item-opacity' 
                            type='range' 
                            min='0' max='100' 
                            value={ model.getOpacity(layer) } 
                            onChange={ this.updateOpacity }/>
                </div>
                <div className='CompositePipeline_children'>
                    { children.map(function(item, idx) {
                        return <ChildItem key={idx} item={item} layer={item.ids.join('')} model={model} />;
                    })}
                </div>
            </div>
        );
    },

});
