var React = require('react'),
    WidgetFactory = require('../../widget/Factory/index.js'),
    CatalystWidget = require('../AbstractMenu');

export default React.createClass({

    propTypes: {
        queryDataModel: React.PropTypes.object.isRequired,
        geometryBuilder: React.PropTypes.object.isRequired,
        config: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            config: {}
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
    }
});
