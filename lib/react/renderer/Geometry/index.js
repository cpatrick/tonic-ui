var React = require('react'),
    ReactDOM = require('react-dom'),
    sizeHelper = require('../../../util/SizeHelper'),
    debounce = require('../../../util/debounce');

export default React.createClass({

    getInitialState() {
        return { width: 200, height: 200 };
    },

    getDefaultProps() {
        return { };
    },

    componentWillMount() {
        // Listen to window resize
        this.sizeSubscription = sizeHelper.onSizeChange(this.updateDimensions);

        // Make sure we monitor window size if it is not already the case
        sizeHelper.startListening();
    },

    componentWillUnmount() {
        // Remove window listener
        if(this.sizeSubscription){
            this.sizeSubscription.unsubscribe();
            this.sizeSubscription = null;
        }
    },

    updateDimensions() {
        var el = ReactDOM.findDOMNode(this).parentNode,
            elSize = sizeHelper.getSize(el);

        if(el && (this.state.width !== elSize.clientWidth || this.state.height !== elSize.clientHeight)) {
            this.setState({ width: elSize.clientWidth, height: elSize.clientHeight });

            if(this.props.geometryBuilder) {
                this.props.geometryBuilder.updateSize(innerWidth, innerHeight);
            }
            return true;
        }
        return false;
    },

    componentDidMount() {
        if(this.props.geometryBuilder) {
            this.props.geometryBuilder.configureRenderer(ReactDOM.findDOMNode(this.refs.canvasRenderer));
            this.props.geometryBuilder.render();
        }
        this.updateDimensions();
    },

    componentDidUpdate(nextProps, nextState) {
        this.updateDimensions();
    },

    resetCamera() {
        if(this.props.geometryBuilder) {
            this.props.geometryBuilder.resetCamera();
        }
    },

    render() {
        return (
                <canvas
                    className='CanvasImageRenderer'
                    ref='canvasRenderer'
                    width={ this.state.width }
                    height={ this.state.height }>
                </canvas>
        );
    }
});
