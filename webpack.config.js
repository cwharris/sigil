/// <binding ProjectOpened='Watch - Development' />
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

var config = {
    entry: {
        "app": [
            "babel-polyfill",
            "./src/index.tsx"
        ],
        "app.styles": "./src/index.less",
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "./www/dist"),
        publicPath: "/www/dist/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        historyApiFallback: true
    },
    module: {
        loaders: [
            {
                test: /\.ts(x)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015!ts-loader',
            },
            
            //bootstrap
            //{ test: /bootstrap(\\|\/)js(\\|\/)/, loader: 'imports?jQuery=jquery' },
            //{ test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            //{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            //{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            //{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},

            //font-awesome
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=./fonts/[name].[ext]" },

            // styles
            { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")}
        ]
    },
    resolve: {
        root: [
            path.resolve("./src")
        ],
        extensions: [
            "",
            ".ts",
            ".tsx",
            ".webpack.js",
            ".web.js",
            ".js",
            ".jsx"
        ]
    },
    plugins: [
        new ExtractTextPlugin("app.bundle.styles.css"),
    ]
};

module.exports = config;
