require('./style.css');

var React = require('react'),
    QueryDataModelDataListenerMixin = require('./QueryDataModelDataListenerMixin'),
    QueryDataModelDataListenerUpdateMixin = require('./QueryDataModelDataListenerUpdateMixin'),
    NumberWidget = require('./Number'),
    ListWidget = require('./String');

/**
 * This React component expect the following input properties:
 *   - model:
 *       Expect a QueryDataModel instance.
 *   - listener:
 *       Expect a Boolean based on the automatic data model registration for listening.
 *       Default value is true and false for the sub components.
 */
export default React.createClass({

    mixins: [QueryDataModelDataListenerMixin, QueryDataModelDataListenerUpdateMixin],

    render() {
        var model = this.props.model,
            orderList = model.originalData.arguments_order;
        return (
            <div className='QueryDataModelWidget'>
                { orderList.map(function(name) {
                    if(model.getUiType(name) === 'list') {
                        return <ListWidget
                                    key={name}
                                    model={model}
                                    arg={name}
                                    listener={false} />;
                    } else if (model.getUiType(name) === 'slider') {
                        return <NumberWidget
                                    key={name}
                                    model={model}
                                    arg={name}
                                    listener={false} />;
                    }
                    return;
                })}
            </div>
        );
    }
});
