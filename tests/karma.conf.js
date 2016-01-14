var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: true,
    frameworks: [ 'jasmine' ],
    files: [
      'component-tests.js'
    ],
    plugins: [ 'karma-jasmine', 'karma-chrome-launcher', 'karma-sourcemap-loader', 'karma-webpack', 'karma-coverage'],
    preprocessors: {
      'component-tests.js': ['webpack', 'sourcemap']
    },
    reporters: ['progress', 'coverage'],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=60000&mimetype=application/font-woff" },
          { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=60000" },
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
          { test: /\.css$/, loader: "style!css!autoprefixer?browsers=last 2 version" },
          { test: /\.js$/i, exclude: /node_modules/, loader: "babel?presets[]=react,presets[]=es2015" },
          { test: /\.js$/i, include: /node_modules\/tonic-/, loader: "babel?presets[]=react,presets[]=es2015" },
          { test: /\.c$/i, include: /node_modules\/tonic-/, loader: "shader" },
          { test: /\.js$/, include: /node_modules\/react-contenteditable/, loader: "babel?presets[]=react,presets[]=es2015" }
        ],
        postLoaders: [ { //delays coverage til after tests are run, fixing transpiled source coverage error
          test: /\.js$/,
          exclude: /(test|node_modules|bower_components)\//,
          loader: 'istanbul-instrumenter' }
        ]
      },
      externals: {
        "three": "THREE"
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    coverageReporter: {
      type: 'html', //produces a html document after code is run
      dir: 'coverage/' //path to created html doc
    }
  });
};
