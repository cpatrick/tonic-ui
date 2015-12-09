var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var expect = require('expect');

var context = require.context('../lib/react/', true, /test\.js$/);
context.keys().forEach(context);