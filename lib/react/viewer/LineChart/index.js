import debounce     from '../../../util/debounce';
import equals       from 'mout/src/object/equals';
import React        from 'react';
import ReactDOM     from 'react-dom';
import sizeHelper   from '../../../util/SizeHelper';

// Load the associated style
require('./style.css')

function interpolate(values, xRatio) {
    var size = values.length,
        idx = size * xRatio,
        a = values[Math.floor(idx)],
        b = values[Math.ceil(idx)],
        ratio = idx - Math.floor(idx);
    return ((b-a)*ratio + a).toFixed(5);
}

/**
 * This React component expect the following input properties:
 */
export default React.createClass({

    propTypes: {
        data: React.PropTypes.any.isRequired,
        legend: React.PropTypes.bool,
        colors: React.PropTypes.array,
        width: React.PropTypes.number,
        height: React.PropTypes.number
    },

    getInitialState() {
        return {
            legend: this.props.legend,
            width: this.props.width/2,
            height: this.props.height/2,
            fieldsColors: {}
        };
    },

    getDefaultProps() {
        return {
            legend: false,
            colors: ["#e1002a", "#417dc0", "#1d9a57", "#e9bc2f", "#9b3880"],
            width: 200,
            height: 200
        };
    },

    toggleLegend() {
        this.setState({ legend: !this.state.legend });
    },

    componentWillMount() {
        this.xPosition = 0;
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
        this.xPosition = 0;

        var el = ReactDOM.findDOMNode(this).parentNode,
            elSize = sizeHelper.getSize(el);

        if(el && (this.state.width !== elSize.clientWidth || this.state.height !== elSize.clientHeight)) {
            this.setState({ width: elSize.clientWidth, height: elSize.clientHeight });
            return true;
        }
        return false;
    },

    componentDidMount() {
        this.updateDimensions();
        // this.drawChart();
    },

    componentDidUpdate(prevProps, prevState) {
        this.drawChart();
    },

    onMove(event) {
        this.xPosition = event.clientX - (event.target.getClientRects()[0].x || event.target.getClientRects()[0].left);

        // Update fields values

        if(this.isMounted() && this.state.legend) {
            this.drawChart();
        }
    },

    drawChart() {
        if(!this.props.data) {
            return;
        }

        var ctx = ReactDOM.findDOMNode(this.refs.canvas).getContext('2d'),
            fields = this.props.data.fields,
            size = fields.length,
            fieldsColors = {},
            fieldsValues = {},
            ratio = this.xPosition / ctx.canvas.width;

        ctx.canvas.width = this.state.width;
        ctx.canvas.height = this.state.height;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for(var idx = 0; idx < size; ++idx) {
            this.drawField(ctx, idx, fields[idx].data, fields[idx].range);
            fieldsColors[fields[idx].name] = this.props.colors[idx];
            if(this.refs.hasOwnProperty(fields[idx].name)) {
                ReactDOM.findDOMNode(this.refs[fields[idx].name]).innerHTML = interpolate(fields[idx].data, ratio);
            }
        }

        if(! equals(this.state.fieldsColors, fieldsColors)) {
            this.setState({fieldsColors: fieldsColors});
        }

        // Draw cursor
        if(this.state.legend) {
            ReactDOM.findDOMNode(this.refs.xValueLabel).innerHTML = (
                (this.props.data.xRange[1] - this.props.data.xRange[0]) *
                ratio + this.props.data.xRange[0]).toFixed(5);

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#000000';
            ctx.moveTo(this.xPosition, 0);
            ctx.lineTo(this.xPosition, ctx.canvas.height);
            ctx.stroke();
        }

        if(this.props.cursor !== undefined) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#0000FF';
            ctx.moveTo(this.props.cursor * ctx.canvas.width, 0);
            ctx.lineTo(this.props.cursor * ctx.canvas.width, ctx.canvas.height);
            ctx.stroke();
        }
    },

    drawField(ctx, fieldIndex, values, range) {
        var min = Number.MAX_VALUE,
            max = Number.MIN_VALUE,
            width = ctx.canvas.width,
            height = ctx.canvas.height,
            size = values.length,
            count = values.length,
            xValues = new Uint16Array(count);

        // Compute xValues and min/max
        while(count--) {
            var value = values[count];
            min = Math.min(min, value);
            max = Math.max(max, value);
            xValues[count] = Math.floor(width * (count / size));
        }

        // Update range if any provided
        if(range) {
            min = range[0];
            max = range[1];
        }

        var scaleY = height / (max - min);
        function getY(idx) {
            var value = values[idx];
            value = (value > min) ? ( (value < max) ? value : max) : min;
            return height - Math.floor((value - min) * scaleY);
        }

        // Draw line
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.props.colors[fieldIndex];
        ctx.moveTo(xValues[0], getY(0));
        for(var idx = 1; idx < size; idx++) {
            if(isNaN(values[idx])) {
                if(idx + 1 < size && !isNaN(values[idx+1])) {
                    ctx.moveTo(xValues[idx+1], getY(idx+1));
                }
            } else {
                ctx.lineTo(xValues[idx], getY(idx));
            }
        }
        ctx.stroke();

        return [min, max];
    },

    render() {
        var legend = [];

        for(var name in this.state.fieldsColors) {
            var color = this.state.fieldsColors[name];
            legend.push(<li key={name}>
                            <i className='fa fa-fw fa-square' style={{color}}></i>
                            <b>{name}</b>
                            <span ref={name}></span>
                        </li>);
        }

        return (
            <div className='ChartViewer'>
                <canvas
                    className='ChartViewer_canvas'
                    ref='canvas'
                    onMouseMove={ this.onMove }
                    width={this.state.width}
                    height={this.state.height}>
                </canvas>
                <div className={'ChartViewer_legend ' + (this.state.legend ? '' : 'is-hidden')}>
                    <div className='ChartViewer_legend_bar'>
                        <span ref='xValueLabel'></span>
                        <i className='is-clickable fa fa-fw fa-times' onClick={ this.toggleLegend }></i>
                    </div>
                    <ul className='ChartViewer_legend_content'>
                        { legend }
                    </ul>
                </div>
                <div className={'ChartViewer_legend ' + (this.state.legend ? 'is-hidden' : '')} onClick={ this.toggleLegend }>
                    <div className='ChartViewer_legend_button'>
                        <i className='is-clickable fa fa-fw fa-info'></i>
                    </div>
                </div>
            </div>
        );
  }
});
