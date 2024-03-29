import CollapsibleElement                     from '../CollapsibleElement';
import ExploreButton                          from '../ToggleIconButton';
import QueryDataModelDataListenerMixin        from './QueryDataModelDataListenerMixin';
import QueryDataModelDataListenerUpdateMixin  from './QueryDataModelDataListenerUpdateMixin';
import QueryDataModelWidget                   from './QueryDataModelWidget';
import React                                  from 'react';

export default React.createClass({

    displayName: 'QueryDataModelWidgetWithExploration',

    propTypes: {
        handleExploration: React.PropTypes.bool,
        model: React.PropTypes.object,
    },

    mixins: [QueryDataModelDataListenerMixin, QueryDataModelDataListenerUpdateMixin],

    getDefaultProps() {
      return { handleExploration: false };
    },

    toggleExploration(enabled) {
        this.props.model.exploreQuery(enabled, true, !this.props.handleExploration);
    },

    render() {
        var exploreButton = <ExploreButton 
                                key='explore-button' 
                                icon='fa-compass' 
                                onChange={this.toggleExploration} 
                                value={this.props.model.exploreState.animate}/>;
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
    },
});
