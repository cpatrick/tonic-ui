var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require("path");
    fs = require("fs");

var demos = {
    // Renderers
    ImageRenderer       : "./lib/demo/renderer/Image/index.js",
    MultiLayoutRenderer : "./lib/demo/renderer/MultiLayout/index.js",

    // Viewers
    AbstractMenuViewer  : "./lib/demo/viewer/AbstractMenu/index.js",
    CompositeViewer     : "./lib/demo/viewer/JavaScriptComposite/index.js",
    DiffViewer          : "./lib/demo/viewer/MultiLayout/index-with-diff.js",
    FloatImage          : "./lib/demo/viewer/FloatImage/index.js",
    ImageBuilderViewer  : "./lib/demo/viewer/ImageBuilder/index.js",
    LineChartViewer     : "./lib/demo/viewer/LineChart/index.js",
    MultiLayoutViewer   : "./lib/demo/viewer/MultiLayout/index.js",
    Probe3dViewer       : "./lib/demo/viewer/Probe3D/index.js",
    VolumeDepthViewer   : "./lib/demo/viewer/VolumeWithDepth/index.js",
    WebGlLight          : "./lib/demo/viewer/WebGlCompositeViewerLight/index.js",
    WebGlRawRGBD        : "./lib/demo/viewer/WebGlCompositeViewerRawRGBD/index.js",
    WebGlRGBD           : "./lib/demo/viewer/WebGlCompositeViewerRGBD/index.js",

    // Widgets
    ButtonSelector      : "./lib/demo/widget/ButtonSelector/index.js",
    CollapsibleElement  : "./lib/demo/widget/CollapsibleElement/index.js",
    ColorPicker         : "./lib/demo/widget/ColorPicker/index.js",
    CompositeControl    : "./lib/demo/widget/CompositeControl/index.js",
    CoordinateControl   : "./lib/demo/widget/CoordinateControl/index.js",
    Equalizer           : "./lib/demo/widget/Equalizer/index.js",
    InlineToggleButton  : "./lib/demo/widget/InlineToggleButton/index.js",
    LookupTable         : "./lib/demo/widget/LookupTable/index.js",
    NumberSlider        : "./lib/demo/widget/NumberSlider/index.js",
    ParameterSet        : "./lib/demo/widget/ParameterSet/index.js",
    
    // Properties
    PropertyBlock       : "./lib/demo/properties/Main/index.js"
};

// ----------------------------------------------------------------------------

var args = process.argv.slice(2);
if (args.length === 0) {
    buildAll('""');
} else if (args[0] === 'list') {
    console.log('__AVAILABLE DEMOS__');
    Object.keys(demos)
        .sort()
        .forEach(function(el) {
            console.log('  ' + el);
        });
}
else {
    var list = [],
        baseUrl = '""';

    args.forEach(function(arg) {
        if(arg.indexOf('-url=') === 0) {
           baseUrl = arg.split('=')[1];
           baseUrl = '"' + baseUrl + '"';
        } else {
           list.push(arg);
        }
    });

    if(list.length) {
        buildSet(list, baseUrl);
    } else {
        buildAll(baseUrl);
    }
}

// ----------------------------------------------------------------------------

function buildWebpackConfiguration(name, basepath) {
    var path = demos[name],
        config = {
            plugins: [],
            entry: path,
        output: {
          path: './docs/www/demo/' + name,
          filename: name + '.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './docs/demo/demoTemplate.html',
                inject: 'body',
                title: name
            }),
            new webpack.DefinePlugin({
                __BASE_PATH__: '' + basepath
            })
        ],
        module: {
          loaders: [
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=60000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=60000" },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test: /\.css$/, loader: "style!css!autoprefixer?browsers=last 2 version" },
            { test: /\.c$/i, include: /node_modules\/tonic-/, loader: "shader" },
            { test: /\.js$/, include: /node_modules\/tonic-/, loader: "babel?presets[]=react,presets[]=es2015" },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel?presets[]=react,presets[]=es2015" }
          ]
        },
        externals: {
            "three": "THREE"
        }
    };

    return config;
}

// ----------------------------------------------------------------------------

function buildSet(demoNames, baseUrl) {
    var keys = Object.keys(demos);
    demoNames.forEach(function(el) {
        var demoIdx = keys.indexOf(el);
        if ( demoIdx !== -1) {
            build(el, baseUrl);
        } else {
            console.warn('"' + el + '" not in demos list.');
        }
    });
}

// ----------------------------------------------------------------------------

function buildAll(baseUrl) {
    Object.keys(demos).forEach(function(el) {
        build(el, baseUrl);
    });
}

// ----------------------------------------------------------------------------

function build(name, baseUrl) {
    var options = buildWebpackConfiguration(name, baseUrl);
    console.log('building ' + name);
    webpack(options, function(err, stats){
        if (err) {
            console.error(name + ' has errors.');
            throw err;
        }
        var jsonStats = stats.toJson();
        if (stats.hasErrors()) {
            console.error('Error building ' + name + ', at ' + demos[name]);
            throw jsonStats.errors;
        } else if (stats.hasWarnings()) {
            console.warn(name + ' built with warnings.');
            console.warn(jsonStats.warnings);
        } else {
            console.log(name + ' built.');
        }
    });
}
