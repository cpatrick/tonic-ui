import CollapsibleElement                   from '../CollapsibleElement';
import CompositeControl                     from '../CompositeControl';
import Equalizer                            from '../Equalizer';
import FloatImageControl                    from '../FloatImageControl';
import LightPropertiesWidget                from '../LightProperties';
import LookupTableManagerWidget             from '../LookupTable/LookupTableManagerWidget';
import LookupTableWidget                    from '../LookupTable';
import PixelOperatorControl                 from '../PixelOperatorControl';
import ProbeControl                         from '../ProbeControl';
import QueryDataModelWithExplorationWidget  from '../ParameterSet/QueryDataModelWithExplorationWidget';
import React                                from 'react';
import VolumeControlWidget                  from '../VolumeControl';

/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */
const WidgetFactoryMapping = {
        QueryDataModelWidget({queryDataModel, handleExploration}) {
            return <QueryDataModelWithExplorationWidget key='QueryDataModel' handleExploration={!!handleExploration} model={queryDataModel}/>;
        },
        EqualizerWidget({levels, colors=['#cccccc'], callback}) {
            return <Equalizer key='Equalizer' width={300} height={120} layers={levels} onChange={callback} colors={colors}/>;
        },
        LookupTableWidget({originalRange=[0,1], lookupTable, lookupTableManager}) {
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
        LookupTableManagerWidget({lookupTableManager, field}) {
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
        CompositeControl({pipelineModel}) {
            return <CollapsibleElement title="Pipeline" key='CompositeControl_parent'>
                <CompositeControl
                        key='CompositeControl'
                        ref='CompositeControl'
                        model={ pipelineModel }
                    />
                </CollapsibleElement>
        },
        ProbeControl({model}) {
            return <ProbeControl
                        key='ProbeControl'
                        ref='ProbeControl'
                        imageBuilder={ model }
                    />
        },
        LightPropertiesWidget({light}) {
            return <LightPropertiesWidget
                        key='LightPropertiesWidget'
                        ref='LightPropertiesWidget'
                        light={light}
                    />
        },
        VolumeControlWidget({ lookupTable, equalizer, intensity, computation }) {
            return <VolumeControlWidget
                        key='VolumeControlWidget'
                        ref='VolumeControlWidget'
                        intensity={intensity}
                        computation={computation}
                        equalizer={equalizer}
                        lookupTable={lookupTable}
                    />
        },
        PixelOperatorControl({model}) {
            return <PixelOperatorControl
                        key='PixelOperatorControl'
                        ref='PixelOperatorControl'
                        operator={model}
                    />
        },
        FloatImageControl({model}) {
            return <FloatImageControl
                        key='FloatImageControl'
                        ref='FloatImageControl'
                        model={model}
                    />
        },
    };
/* eslint-enable react/display-name */
/* eslint-enable react/no-multi-comp */

function createWidget(name, options) {
    var fn = WidgetFactoryMapping[name];

    if(fn) {
        return fn(options);
    }
    return null
}

function getWidgets(obj) {
    if(!obj) {
        return [];
    }

    const widgetDesc = obj.getControlWidgets(),
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

export default {
    createWidget,
    getWidgets,
};
