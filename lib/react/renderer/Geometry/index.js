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
        window.addEventListener("resize", debounce(this.updateDimensions, 250));
    },

    componentWillUnmount() {
        // Remove window listener
        window.removeEventListener("resize", debounce(this.updateDimensions, 250));
    },

    updateDimensions() {
        var el = ReactDOM.findDOMNode(this).parentNode,
            innerWidth = Math.floor(sizeHelper.getInnerWidth(el)),
            innerHeight = Math.floor(sizeHelper.getInnerHeight(el));

        if(el && (this.state.width !== innerWidth || this.state.height !== innerHeight)) {
            this.setState({ width: innerWidth, height: innerHeight });

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
