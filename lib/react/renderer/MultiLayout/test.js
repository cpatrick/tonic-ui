var React = require('react'),
    ReactDOM = require('react-dom'),
    MultiViewRenderer = require('../../../react/renderer/MultiLayout'),
    jsonData = require('json!tonic-arctic-sample-data/data/probe/index.json'),
    QueryDataModel = require('tonic-io/lib/QueryDataModel'),
    ImageBuilder = require('tonic-core/lib/builder/image/DataProber'),
    LookupTableManager = require('tonic-core/lib/model/LookupTable/LookupTableManager.js'),
    container = document.querySelector('body'),
    dataModel = new QueryDataModel(jsonData, 'tonic-arctic-sample-data/data/probe/'),
    lutManager = new LookupTableManager(),
    imageBuilderA = new ImageBuilder(dataModel, lutManager),
    imageBuilderB = new ImageBuilder(dataModel, lutManager),
    imageBuilderC = new ImageBuilder(dataModel, lutManager),
    equals = require('mout/src/array/equals'),
    expect = require('expect'),
    TestUtils = require('react/lib/ReactTestUtils');

describe('MultiViewRenderer', function() {

    var el;
    beforeAll(function() {
        // Taken from demo.
        // Configure Image builders
        var field = imageBuilderA.getFields()[0];
        imageBuilderA.setField(field);
        imageBuilderB.setField(field);
        imageBuilderC.setField(field);

        imageBuilderA.setProbe(10,10,10);
        imageBuilderB.setProbe(10,10,10);
        imageBuilderC.setProbe(10,10,10);

        imageBuilderA.renderMethod = 'XY';
        imageBuilderB.renderMethod = 'ZY';
        imageBuilderC.renderMethod = 'XZ';

        imageBuilderA.update();
        imageBuilderB.update();
        imageBuilderC.update();

        function updateProbeLocationFromA(data, envelope) {
            var builders = [imageBuilderB, imageBuilderC];

            builders.forEach(function(builder) {
                if(!equals(data, builder.getProbe())) {
                    builder.setProbe(data[0], data[1], data[2])
                }
            });
        }
        function updateProbeLocationFromB(data, envelope) {
            var builders = [imageBuilderA, imageBuilderC];

            builders.forEach(function(builder) {
                if(!equals(data, builder.getProbe())) {
                    builder.setProbe(data[0], data[1], data[2])
                }
            });
        }
        function updateProbeLocationFromC(data, envelope) {
            var builders = [imageBuilderA, imageBuilderB];

            builders.forEach(function(builder) {
                if(!equals(data, builder.getProbe())) {
                    builder.setProbe(data[0], data[1], data[2])
                }
            });
        }
        imageBuilderA.onProbeChange(updateProbeLocationFromA);
        imageBuilderB.onProbeChange(updateProbeLocationFromB);
        imageBuilderC.onProbeChange(updateProbeLocationFromC);

        // Configure container
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';

        container.style.width = '100%'
        container.style.height = '100%'
        container.style.position = 'absolute'

        el = TestUtils.renderIntoDocument(
            React.createElement(
                MultiViewRenderer,
                {
                    renderers: {
                        'XY': { builder: imageBuilderA, name: 'XY'},
                        'ZY': { builder: imageBuilderB, name: 'ZY'},
                        'XZ': { builder: imageBuilderC, name: 'XZ'}
                    }
                }),
                container
            );

        dataModel.fetchData();
    });

    it('renders on a page', function() {
        expect(el).toExist();
    });

    it('can change layouts', function() {
        el.getLayouts().forEach((layout) => {
            el.setLayout(layout);
            expect(el.getActiveLayout()).toEqual(layout);
        });
    });
});