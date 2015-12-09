var React = require('react'),
    CollapsibleElement = require('../CollapsibleElement'),
    LutWidget = require('./index.js'),
    Dropdown = require('./Dropdown.js');

export default React.createClass({

    propTypes: {
        lookupTableManager: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        var luts = this.props.lookupTableManager.luts,
            fields = Object.keys(luts),
            field = this.props.field || fields[0]
        return { field, fields };
    },

    componentWillMount() {
        this.changeSubscription = this.props.lookupTableManager.onFieldsChange( (data, enevelope) => {
            var fields = Object.keys(this.props.lookupTableManager.luts);
            this.setState({fields});
        });
    },

    componentWillUnmount() {
        if(this.changeSubscription) {
            this.changeSubscription.unsubscribe();
            this.changeSubscription = null;
        }
    },

    onFieldsChange(newVal) {
        this.props.lookupTableManager.updateActiveLookupTable(newVal);
        this.setState({field:newVal});
    },

    render() {
        var lutManager = this.props.lookupTableManager,
            lut = lutManager.getLookupTable(this.state.field),
            originalRange = lut.getScalarRange();

        return (
            <CollapsibleElement title="Lookup Table"
                subtitle={
                    <Dropdown field={this.state.field} fields={this.state.fields} onChange={this.onFieldsChange}/>
                }>
                <div className='LookupTableWidget_selector'>
                    <LutWidget
                        lutManager={ lutManager }
                        lut={ lut }
                        originalRange={ originalRange }
                    />
                </div>
            </CollapsibleElement>
        );
    }
});
