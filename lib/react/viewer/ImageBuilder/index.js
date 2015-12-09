var React = require('react'),
    WidgetFactory = require('../../widget/Factory/index.js'),
    CatalystWidget = require('../AbstractMenu');

export default React.createClass({

    propTypes: {
        imageBuilder: React.PropTypes.object.isRequired,
        queryDataModel: React.PropTypes.object.isRequired,
        config: React.PropTypes.object,
        menuAddOn: React.PropTypes.array
    },

    getDefaultProps() {
        return {
            config: {}
        };
    },

    attachListener(dataModel) {
        this.detachListener();
        if(dataModel && dataModel.onModelChange) {
            this.changeSubscription = dataModel.onModelChange((data, envelope) => {
                this.forceUpdate();
            });
        }
    },

    detachListener() {
        if (this.changeSubscription) {
            this.changeSubscription.unsubscribe();
            this.changeSubscription = null;
        }
    },

    componentWillReceiveProps(nextProps) {
        var previousDataModel = this.props.imageBuilder,
            nextDataModel = nextProps.imageBuilder;

        if(previousDataModel !== nextDataModel) {
            this.detachListener();
            if(this.props.config.MagicLens) {
                this.attachListener(nextDataModel);
            }
        }
    },

    componentWillMount() {
        this.attachListener(this.props.imageBuilder);
    },

    componentWillUnmount() {
        this.detachListener();
    },

    render() {
        var queryDataModel = this.props.queryDataModel,
            magicLensController = this.props.config.MagicLens ? this.props.imageBuilder : null,
            imageBuilder = this.props.config.MagicLens ? this.props.imageBuilder.getActiveImageBuilder() : this.props.imageBuilder,
            controlWidgets = WidgetFactory.getWidgets(imageBuilder);

        // Add menuAddOn if any at the top
        if(this.props.menuAddOn) {
            controlWidgets = this.props.menuAddOn.concat(controlWidgets);
        }

        return (
            <CatalystWidget
                queryDataModel={queryDataModel}
                magicLensController={magicLensController}
                imageBuilder={imageBuilder}
                config={ this.props.config || {} } >
                    { controlWidgets }
            </CatalystWidget>
        );
    }
});
