var React = require('react');

/**
 * This React component expect the following input properties:
 *   - model:
 *       Expect a LokkupTable instance that you want to render and edit.
 *   - item:
 *       Root of the tree
 */
export default React.createClass({

    toggleActiveLayer(event) {
        this.props.model.toggleLayerActive(this.props.layer);
    },

    updateOpacity(e) {
        this.props.model.setOpacity(this.props.layer, e.target.value);
        this.forceUpdate();
    },

    render() {
        var inEditMode = this.props.model.isLayerInEditMode(this.props.layer),
            isActive = this.props.model.isLayerActive(this.props.layer),
            hidden = !isActive && !inEditMode,
            hasOpacity = this.props.model.hasOpacity();

        return (
            <div className={ 'CompositePipeline_item ' + (hidden ? 'is-hidden' : '')}>
                <i className={ !inEditMode ? 'fa fa-fw fa-times is-fade' : isActive ? 'fa fa-fw fa-check is-action' : 'fa fa-fw fa-times'}
                    onClick={this.toggleActiveLayer} >
                </i>
                <div className='CompositePipeline_item-label'>
                    { this.props.item.name }
                </div>
                <input className={ hasOpacity ? 'CompositePipeline_item-opacity' : 'CompositePipeline_item-opacity-hidden' } type='range' min='0' max='100' value={ this.props.model.getOpacity(this.props.layer) } onChange={ this.updateOpacity }/>
            </div>
        );
    }

});
