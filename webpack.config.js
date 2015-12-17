var webpack = require('webpack');

module.exports = {
  plugins: [],
  entry: './lib/index.js',
  output: {
    path: './dist',
    filename: 'tonic-ui.js',
  },
  module: {
    preLoaders: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "jshint!babel?presets[]=react,presets[]=es2015"
      },{
          test: /\.js$/,
          include: /node_modules\/tonic-/,
          loader: "babel?presets[]=react,presets[]=es2015"
      },{
          test: /\.js$/,
          include: /node_modules\/react-contenteditable/,
          loader: "babel?presets[]=react,presets[]=es2015"
      }
    ],
    loaders: [
        {
          test: /\.css$/,
          loader: "style-loader!css-loader!autoprefixer-loader?browsers=last 2 version"
        },{
          test: require.resolve("./lib/index.js"),
          loader: "expose?Tonic.ui"
        },{
          test: /\.(png|jpg)$/,
          loader: 'url-loader?limit=8192'
        },
    ]
  },
  jshint: {
    esnext: true,
    browser: true,
    globalstrict: true // Babel add 'use strict'
  },
  externals: {
    "three": "THREE"
  }
};
