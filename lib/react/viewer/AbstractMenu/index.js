// Load css
require('./style.css');
require('./select-arrows.png');

var React = require('react'),
    GeometryRenderer = require('../../renderer/Geometry'),
    ImageRenderer = require('../../renderer/Image'),
    MultiViewRenderer = require('../../renderer/MultiLayout');

export default React.createClass({

    propTypes: {
        config: React.PropTypes.object,
        renderer: React.PropTypes.string
    },

    getInitialState() {
        return { collapsed: true, speedIdx: 0, speeds: [ 20, 50, 100, 200, 500 ], record: false };
    },

    getDefaultProps() {
        return {
            config: {},
            renderer: 'ImageRenderer'
        };
    },

    attachListener(dataModel) {
        this.detachListener();
        this.queryDataModelChangeSubscription = dataModel.onStateChange((data, envelope) => {
            this.forceUpdate();
        });
    },

    detachListener() {
        if (this.queryDataModelChangeSubscription) {
            this.queryDataModelChangeSubscription.unsubscribe();
            this.queryDataModelChangeSubscription = null;
        }
    },

    componentWillReceiveProps(nextProps) {
        var previousDataModel = this.props.queryDataModel,
            nextDataModel = nextProps.queryDataModel;

        if(previousDataModel !== nextDataModel) {
            this.detachListener();
            this.attachListener(nextDataModel);
        }
    },

    // Auto mount listener unless notified otherwise
    componentWillMount() {
        this.attachListener(this.props.queryDataModel);
    },

    // Auto unmount listener
    componentWillUnmount() {
        this.detachListener();
    },

    toggleRecord() {
        var record = !this.state.record;
        this.setState({record});
        this.getRenderer().recordImages(record);
    },

    togglePanel() {
        this.setState({ collapsed: !this.state.collapsed });
        this.props.queryDataModel.fetchData();
    },

    toggleLens() {
        var magicLensController = this.props.magicLensController;
        if(magicLensController) {
            magicLensController.toggleLens();
            this.forceUpdate();
        }
    },

    resetCamera() {
        if(this.isMounted() && (this.props.renderer === 'ImageRenderer' || this.props.renderer === 'GeometryRenderer')) {
            this.refs.imageRenderer.resetCamera()
        }
    },

    play() {
        this.props.queryDataModel.animate(true, this.state.speeds[this.state.speedIdx]);
    },

    stop() {
        this.props.queryDataModel.animate(false);
    },

    updateSpeed() {
        var newIdx = (this.state.speedIdx + 1) % this.state.speeds.length,
            queryDataModel = this.props.queryDataModel;

        this.setState({ speedIdx: newIdx });
        if(queryDataModel.isAnimating()) {
            queryDataModel.animate(true, this.state.speeds[newIdx]);
        }
    },

    getRenderer() {
        return this.refs.imageRenderer;
    },

    render() {
        var queryDataModel = this.props.queryDataModel,
            magicLensController = this.props.magicLensController,
            rootImageBuilder = magicLensController || this.props.imageBuilder,
            renderer = null,
            serverRecording = !!this.props.config.Recording,
            isImageRenderer = (this.props.renderer === 'ImageRenderer'),
            isMultiViewer = (this.props.renderer === 'MultiViewRenderer'),
            isGeometryViewer = (this.props.renderer === 'GeometryRenderer');

        if(isImageRenderer) {
            renderer = (<ImageRenderer
                            ref='imageRenderer'
                            className='CatalystWidget_ImageViewerWidget'
                            imageBuilder={ rootImageBuilder }
                            listener={ this.props.mouseListener || rootImageBuilder.getListeners() }
                        />);
        }

        if(isMultiViewer) {
            renderer = (<MultiViewRenderer
                            ref='imageRenderer'
                            className='CatalystWidget_ImageViewerWidget'
                            renderers={this.props.renderers}
                            layout={this.props.layout}
                        />);
        }

        if(isGeometryViewer) {
            renderer = (<GeometryRenderer
                            ref='imageRenderer'
                            className='CatalystWidget_ImageViewerWidget'
                            geometryBuilder={this.props.geometryBuilder}
                        />);
        }

        return (
            <div className='CatalystWidget'>
                <div
                    className={ (this.state.collapsed ? 'is-collapsed ' : '') + 'CatalystWidget_control'}>
                    <div className='CatalystWidget_control_bar'>
                        <i
                            className={ magicLensController ? ( magicLensController.isFront() ? 'fa fa-search left' : 'fa-inverse fa fa-search left') : 'is-hidden' }
                            onClick={ this.toggleLens }
                            style={ { background: (magicLensController && magicLensController.isFront()) ? 'inherit' : '#000000', borderRadius: '5px'}} >
                        </i>
                        <i
                            className={ (serverRecording && isImageRenderer && this.props.imageBuilder.handleRecord) ? (this.state.record ? 'fa fa-circle left': 'fa fa-circle-thin left') : 'is-hidden' }
                            style={ {color: this.state.record ? '#FF0000' : '#000000'}}
                            onClick={ this.toggleRecord }>
                        </i>
                        <i
                            className={ (isImageRenderer || isGeometryViewer) ? 'fa fa-arrows-alt left' : 'is-hidden' }
                            onClick={ this.resetCamera }>
                        </i>
                        <i
                            className={ (queryDataModel.hasAnimationFlag() && !queryDataModel.isAnimating() ? '' : 'is-hidden ') + 'fa fa-play left'}
                            onClick={ this.play }>
                        </i>
                        <i
                            className={ (queryDataModel.isAnimating() ? '' : 'is-hidden ') + 'fa fa-stop left'}
                            onClick={ this.stop }>
                        </i>
                        <i
                            className={ (queryDataModel.hasAnimationFlag() ? '' : 'is-hidden ') + 'fa fa-clock-o left'}
                            onClick={ this.updateSpeed }>

                        </i>
                        <i
                            className={ (queryDataModel.hasAnimationFlag() ? 'left' : 'is-hidden')}
                            onClick={ this.updateSpeed }>
                            { this.state.speeds[this.state.speedIdx] + 'ms'}
                        </i>
                        <i
                            className='fa fa-bars right'
                            onClick={ this.togglePanel }>
                        </i>
                    </div>
                    <div className='CatalystWidget_control_content'>
                        { this.props.children }
                    </div>
                </div>
                { renderer }
            </div>
        );
    }
});
