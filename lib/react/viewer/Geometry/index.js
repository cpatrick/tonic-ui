import CatalystWidget   from '../AbstractMenu';
import React            from 'react';

export default React.createClass({

    displayName: 'GeometryViewer',

    propTypes: {
        config: React.PropTypes.object,
        geometryBuilder: React.PropTypes.object.isRequired,
        menuAddOn: React.PropTypes.array,
        queryDataModel: React.PropTypes.object.isRequired,
    },

    getDefaultProps() {
        return {
            config: {},
        };
    },

    render() {
        var queryDataModel = this.props.queryDataModel,
            geometryBuilder = this.props.geometryBuilder,
            controlWidgets = [];

        // Add menuAddOn if any at the top
        if(this.props.menuAddOn) {
            controlWidgets = this.props.menuAddOn.concat(controlWidgets);
        }

        return (
            <CatalystWidget
                queryDataModel={queryDataModel}
                geometryBuilder={geometryBuilder}
                renderer='GeometryRenderer'
                config={ this.props.config || {} } >
                    { controlWidgets }
            </CatalystWidget>
        );
    },
});
