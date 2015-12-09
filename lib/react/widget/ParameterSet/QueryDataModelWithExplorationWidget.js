var React = require('react'),
    QueryDataModelDataListenerMixin = require('./QueryDataModelDataListenerMixin'),
    QueryDataModelDataListenerUpdateMixin = require('./QueryDataModelDataListenerUpdateMixin'),
    QueryDataModelWidget = require('./QueryDataModelWidget'),
    CollapsibleElement = require('../CollapsibleElement'),
    ExploreButton = require('../ToggleIconButton');

export default React.createClass({

    propTypes: {
        model: React.PropTypes.object,
        handleExploration: React.PropTypes.bool
    },

    mixins: [QueryDataModelDataListenerMixin, QueryDataModelDataListenerUpdateMixin],

    getDefaultProps() {
      return { handleExploration: false };
    },

    toggleExploration(enabled) {
        this.props.model.exploreQuery(enabled, true, !this.props.handleExploration);
    },

    render() {
        var exploreButton = <ExploreButton key='explore-button' icon='fa-compass' onChange={this.toggleExploration} value={this.props.model.exploreState.animate}/>;
        return <CollapsibleElement
                    title="Parameters"
                    key='QueryDataModelWidget_parent'
                    visible={ this.props.model.originalData.arguments_order.length > 0 }
                    subtitle={exploreButton}>
                    <QueryDataModelWidget
                        key='QueryDataModelWidget'
                        ref='QueryDataModelWidget'
                        model={ this.props.model }
                    />
                </CollapsibleElement>;
    }
});
