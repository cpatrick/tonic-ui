import CatalystWidget           from '../AbstractMenu';
import ChartViewer              from '../LineChart';
import CollapsibleElement       from '../../widget/CollapsibleElement';
import LookupTableManagerWidget from '../../widget/LookupTable/LookupTableManagerWidget';
import ProbeControl             from '../../widget/ProbeControl';
import QueryDataModelWidget     from '../../widget/ParameterSet/QueryDataModelWidget';
import React                    from 'react';
import ReactDOM                 from 'react-dom';

// Load css
require('./style.css');
require('../../../css/layout.css');

const
    renderAxisMap = {
        'XY': [0,1,2],
        'ZY': [2,1,0],
        'XZ': [0,2,1],
    },
    chartAxisNames = [ 'x', 'y', 'z' ];

export default React.createClass({

    displayName: 'Probe3DViewer',

    propTypes: {
        imageBuilder: React.PropTypes.object.isRequired,
        probe: React.PropTypes.bool,
        queryDataModel: React.PropTypes.object.isRequired,
    },

    getDefaultProps() {
        return {
            probe: true,
        };
    },

    getInitialState() {
        return {
            probe: [ this.props.imageBuilder.getProbe()[0], this.props.imageBuilder.getProbe()[1], this.props.imageBuilder.getProbe()[2] ],
            chartVisible: false,
            chartSize: { width: 300, height: 300 },
            chartData: { xRange: [0, 1], fields: [] },
            chartAxis: 0,
        };
    },

    // Auto mount listener unless notified otherwise
    componentWillMount() {
        var queryDataModel = this.props.queryDataModel,
        imageBuilder = this.props.imageBuilder;

        this.dragChartFlag = false;

        // Update probe chart data if data change
        this.queryDataModelDataSubscription = queryDataModel.onDataChange((data, envelope) => {
            this.setState({chartData: imageBuilder.getProbeLine(this.liveChartAxis)})
        });

        // Render method change
        imageBuilder.setRenderMethodMutable();
        this.renderMethodChangeSubscription = imageBuilder.onRenderMethodChange((data, envelope) => {
            if (this.state.chartVisible) {
                this.validateChartAxis();
            }
        });

        // Chart management
        imageBuilder.setProbeLineNotification(true);
        this.chartListenerSubscription = imageBuilder.onProbeLineReady((data, envelope) => {
            var chartData = data[chartAxisNames[this.liveChartAxis]];
            this.setState({chartData});
        });

        this.probeListenerSubscription = imageBuilder.onProbeChange((probe, envelope) => {
            this.setState({probe});
        });
    },

    componentDidUpdate() {
        if(this.state.chartVisible) {
            this.refs.chartViewer.updateDimensions();
        }
    },

    // Auto unmount listener
    componentWillUnmount() {
        if(this.queryDataModelDataSubscription) {
            this.queryDataModelDataSubscription.unsubscribe();
            this.queryDataModelDataSubscription = null;
        }
        if(this.renderMethodChangeSubscription) {
            this.renderMethodChangeSubscription.unsubscribe();
            this.renderMethodChangeSubscription = null;
        }
        if(this.chartListenerSubscription) {
            this.chartListenerSubscription.unsubscribe();
            this.chartListenerSubscription = null;
        }
        if(this.probeListenerSubscription) {
            this.probeListenerSubscription.unsubscribe();
            this.probeListenerSubscription = null;
        }
    },

    validateChartAxis() {
        var renderCoords = this.props.imageBuilder.getRenderMethod(),
            chartAxis = 'XYZ'[this.liveChartAxis];

        if (renderCoords.indexOf(chartAxis) === -1) {
            const chartData = this.props.imageBuilder.getProbeLine(chartAxis);

            chartAxis = 'XYZ'.indexOf(renderCoords[0]);

            this.liveChartAxis = chartAxis;
            this.setState({ chartAxis, chartData });
        }
    },

    onChartVisibilityChange(isOpen) {
        if(isOpen) {
            this.validateChartAxis();
        }
        this.setState({chartVisible: isOpen});
    },

    updateChart(event) {
        var idx = Number(event.target.getAttribute('data-index')),
            imageBuilder = this.props.imageBuilder,
            chartData = imageBuilder.getProbeLine(idx);

        this.liveChartAxis = idx;
        this.setState({chartData, chartAxis: idx});
    },

    dragOn(event) {
        var el = ReactDOM.findDOMNode(this.refs.chartContainer),
            top = Number(el.style.top.replace('px','')),
            left = Number(el.style.left.replace('px',''));

        this.dragChartFlag = true;
        this.dragPosition = [event.clientX - left, event.clientY - top];
    },

    dragOff() {
        this.dragChartFlag = false;
    },

    dragChart(event) {
        if(this.dragChartFlag) {
            const el = ReactDOM.findDOMNode(this.refs.chartContainer);
            el.style.left = (event.clientX - this.dragPosition[0]) + 'px';
            el.style.top = (event.clientY - this.dragPosition[1]) + 'px';
        }
    },

    render() {
        var queryDataModel = this.props.queryDataModel,
            imageBuilder = this.props.imageBuilder,
            dimensions = imageBuilder.metadata.dimensions,
            axisMap = renderAxisMap[this.props.imageBuilder.getRenderMethod()];

        var buttonClasses = [];
        [0,1,2].forEach((el) => {
            var classes = [];
            if (axisMap[2] === el) {
                classes.push('is-hidden');
            } else if (this.state.chartAxis === el) {
                classes.push('is-selected');
            }
            buttonClasses.push(classes.join(' '));
        });
        return (
            <div className='ProbeViewer'>
                <CatalystWidget  queryDataModel={queryDataModel} imageBuilder={imageBuilder} mouseListener={imageBuilder.getListeners()}>
                    <LookupTableManagerWidget
                        key='LookupTableManagerWidget'
                        ref='LookupTableManagerWidget'
                        lookupTableManager={ imageBuilder.lookupTableManager }
                        field={ imageBuilder.getField() }
                    />
                    <ProbeControl
                        ref='ProbeControl'
                        imageBuilder={ imageBuilder } />
                    <CollapsibleElement
                        ref='chartCollapsable'
                        title='Chart'
                        visible={this.props.probe && imageBuilder.isCrossHairEnabled()}
                        onChange={this.onChartVisibilityChange}
                        open={this.state.chartVisible}>
                            <div ref="chartButtons" className='CatalystWidget__item-row l-m-t2'>
                                <button
                                    className={ buttonClasses[0] }
                                    type='button' data-index="0"
                                    onClick={ this.updateChart } >X</button>
                                <button
                                    className={ buttonClasses[1] }
                                    type='button' data-index="1"
                                    onClick={ this.updateChart } >Y</button>
                                <button
                                    className={ buttonClasses[2] }
                                    type='button' data-index="2"
                                    onClick={ this.updateChart } >Z</button>
                            </div>
                    </CollapsibleElement>
                    <CollapsibleElement
                        ref='queryDataModelParameters'
                        title='Parameters'
                        visible={ queryDataModel.originalData.arguments_order.length > 0  }>
                            <QueryDataModelWidget model={queryDataModel} />
                    </CollapsibleElement>
                </CatalystWidget>
                <div ref='chartContainer'
                    className={ (this.state.chartVisible && imageBuilder.isCrossHairEnabled()) ? 'ChartContainer' : 'ChartContainer is-hidden'}
                    onMouseMove={ this.dragChart }
                    onMouseUp={ this.dragOff }
                    onMouseDown={ this.dragOn }>
                    <ChartViewer
                        ref='chartViewer'
                        cursor={ (this.state.probe[this.state.chartAxis] / dimensions[this.state.chartAxis]) }
                        data={this.state.chartData}
                        width={ this.state.chartSize.width }
                        height={ this.state.chartSize.height } />
                </div>
            </div>
        );
    },
});
