// Load css
require('../Probe3D/style.css');
require('../../../css/layout.css');

var React = require('react'),
    WidgetFactory = require('../../widget/Factory/index.js'),
    MultiViewControl = require('../../widget/MultiViewControl'),
    CatalystWidget = require('../AbstractMenu');

export default React.createClass({

    propTypes: {
        queryDataModel: React.PropTypes.object.isRequired,
        renderers: React.PropTypes.object.isRequired,
        menuAddOn: React.PropTypes.array
    },

    getInitialState() {
        return {
            activeRenderer: null,
            renderer: null
        };
    },

    attachListener(dataModel) {
        this.detachListener();
        if(dataModel) {
            this.queryDataModelChangeSubscription = dataModel.onStateChange((data, envelope) => {
                this.forceUpdate();
            });
        }
    },

    detachListener() {
        if (this.queryDataModelChangeSubscription) {
            this.queryDataModelChangeSubscription.unsubscribe();
            this.queryDataModelChangeSubscription = null;
        }
    },

    componentWillUpdate(nextProps, nextState) {
        var previousDataModel = (this.state.activeRenderer && this.state.activeRenderer.builder && this.state.activeRenderer.builder.queryDataModel) ? this.state.activeRenderer.builder.queryDataModel : this.props.queryDataModel,
            nextDataModel = (nextState.activeRenderer && nextState.activeRenderer.builder && nextState.activeRenderer.builder.queryDataModel) ? nextState.activeRenderer.builder.queryDataModel : nextProps.queryDataModel;
        if(previousDataModel !== nextDataModel) {
            this.detachListener();
            this.attachListener(nextDataModel);
        }
    },

    // Auto unmount listener
    componentWillUnmount() {
        this.detachListener();
        if(this.activeViewportSubscription) {
            this.activeViewportSubscription.unsubscribe();
            this.activeViewportSubscription = null;
        }
    },

    componentDidMount() {
        var renderer = this.refs.catalystWidget.getRenderer();

        this.setState({renderer});

        this.activeViewportSubscription = renderer.onActiveViewportChange((data, envelope) => {
            this.setState({activeRenderer: this.props.renderers[data.name]});
        });
    },

    render() {
        var queryDataModel = (this.state.activeRenderer && this.state.activeRenderer.builder && this.state.activeRenderer.builder.queryDataModel) ? this.state.activeRenderer.builder.queryDataModel : this.props.queryDataModel,
            controlWidgets = [];

        if(this.state.activeRenderer) {
            controlWidgets = WidgetFactory.getWidgets(this.state.activeRenderer.builder || this.state.activeRenderer.painter);
        }

        // Add menuAddOn if any at the top
        if(this.props.menuAddOn) {
            controlWidgets = this.props.menuAddOn.concat(controlWidgets);
        }

        return (
            <CatalystWidget ref='catalystWidget' queryDataModel={queryDataModel} renderers={this.props.renderers} renderer='MultiViewRenderer' layout={ this.props.layout }>
                <MultiViewControl renderer={ this.state.renderer }/>
                { controlWidgets }
            </CatalystWidget>
         );
    }
});
