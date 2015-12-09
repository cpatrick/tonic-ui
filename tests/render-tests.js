var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var expect = require('expect');
var context = require.context('../lib/react/widget/', true, /test\.js$/);

context.keys().forEach(function(ct) {
    describe("some", function () {
        it('renders without problems', function () {
            var el = context(ct),
                root = TestUtils.renderIntoDocument(<el/>);
            expect(root).toExist();
        });
    });
});