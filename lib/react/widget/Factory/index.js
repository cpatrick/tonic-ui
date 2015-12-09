var React = require('react'),
    CatalystWidget = require('../../viewer/AbstractMenu'),
    ChartViewer = require('../../viewer/LineChart'),
    CollapsibleElement = require('../CollapsibleElement'),
    CompositeControl = require('../CompositeControl'),
    Equalizer = require('../Equalizer'),
    FloatImageControl = require('../FloatImageControl'),
    LightPropertiesWidget = require('../LightProperties'),
    LookupTableManagerWidget = require('../LookupTable/LookupTableManagerWidget'),
    LookupTableWidget = require('../LookupTable'),
    NumberSliderControl = require('../NumberSliderControl'),
    PixelOperatorControl = require('../PixelOperatorControl'),
    ProbeControl = require('../ProbeControl'),
    QueryDataModelWidget = require('../ParameterSet/QueryDataModelWidget'),
    QueryDataModelWithExplorationWidget = require('../ParameterSet/QueryDataModelWithExplorationWidget'),
    VolumeControlWidget = require('../VolumeControl'),
    WidgetFactoryMapping = {
        QueryDataModelWidget: function({queryDataModel, handleExploration}) {
            return <QueryDataModelWithExplorationWidget key='QueryDataModel' handleExploration={!!handleExploration} model={queryDataModel}/>;
        },
        EqualizerWidget: function({levels, colors=['#cccccc'], callback}) {
            return <Equalizer key='Equalizer' width={300} height={120} layers={levels} onChange={callback} colors={colors}/>;
        },
        LookupTableWidget: function({originalRange=[0,1], lookupTable, lookupTableManager}) {
            // var dataRangeToUse = [0, 1];
            // if(model.getOriginalRange) {
            //     dataRangeToUse = model.getOriginalRange();
            // } else if(model.metadata.ranges) {
            //     var field = model.getLookupTableManager().getActiveField();
            //     if(model.getField) {
            //         field = model.getField();
            //     }
            //     dataRangeToUse = model.metadata.ranges[field];
            // }
            return <CollapsibleElement title="LookupTable" key='LookupTableWidget_parent'>
                    <LookupTableWidget
                        key='LookupTableWidget'
                        ref='LookupTableWidget'
                        originalRange={ originalRange }
                        lut={ lookupTable }
                        lutManager={ lookupTableManager }
                    />
                </CollapsibleElement>;
        },
        LookupTableManagerWidget: function({lookupTableManager, field}) {
            if(!field) {
                field = lookupTableManager.getActiveField();
            }
            return <LookupTableManagerWidget
                        key='LookupTableManagerWidget'
                        ref='LookupTableManagerWidget'
                        field={ field }
                        lookupTableManager={ lookupTableManager }
                    />;
        },
        CompositeControl: function({pipelineModel}) {
            return <CollapsibleElement title="Pipeline" key='CompositeControl_parent'>
                <CompositeControl
                        key='CompositeControl'
                        ref='CompositeControl'
                        model={ pipelineModel }
                    />
                </CollapsibleElement>
        },
        ProbeControl: function({model}) {
            return <ProbeControl
                        key='ProbeControl'
                        ref='ProbeControl'
                        imageBuilder={ model }
                    />
        },
        LightPropertiesWidget: function({light}) {
            return <LightPropertiesWidget
                        key='LightPropertiesWidget'
                        ref='LightPropertiesWidget'
                        light={light}
                    />
        },
        VolumeControlWidget: function({ lookupTable, equalizer, intensity, computation }) {
            return <VolumeControlWidget
                        key='VolumeControlWidget'
                        ref='VolumeControlWidget'
                        intensity={intensity}
                        computation={computation}
                        equalizer={equalizer}
                        lookupTable={lookupTable}
                    />
        },
        PixelOperatorControl: function({model}) {
            return <PixelOperatorControl
                        key='PixelOperatorControl'
                        ref='PixelOperatorControl'
                        operator={model}
                    />
        },
        FloatImageControl: function({model}) {
            return <FloatImageControl
                        key='FloatImageControl'
                        ref='FloatImageControl'
                        model={model}
                    />
        }
    };

export function createWidget(name, options) {
    var fn = WidgetFactoryMapping[name];

    if(fn) {
        return fn(options);
    }
    return null
}

export function getWidgets(obj) {
    if(!obj) {
        return [];
    }

    var widgetDesc = obj.getControlWidgets(),
        widgetList = [];

    widgetDesc.forEach(function(desc) {
        var widget = createWidget(desc.name, desc);
        if(widget) {
            widgetList.push(widget);
        } else {
            console.error('Unable to create widget for name: ' + name);
        }
    });

    return widgetList;
}

