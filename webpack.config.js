var webpack = require('webpack');
module.exports = {
    plugins: [],
    entry: './lib/index.js',
    output: {
        path: './dist',
        filename: 'Tonic-core.js',
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: require.resolve("./lib/index.js"),
                loader: "expose?Tonic.ui"
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader?browsers=last 2 version"
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }, {
                test: /\.js$/,
                include: /node_modules\/tonic-/,
                loader: "babel?presets[]=react,presets[]=es2015"
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel?presets[]=react,presets[]=es2015"
            }
        ]
    },
    externals: {
        "three": "THREE"
    },
    eslint: {
        configFile: '.eslintrc'
    }
};