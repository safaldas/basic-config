var path = require("path");

module.exports = {
    entry: "app.js",
    output: {
        filename: "js/app.js",
        sourceMapFile: "js/app.map"
    },
    devtool: '#source-map',
    module: {
        loaders: [{
            loader: 'babel-loader',
            test: /\.jsx?$/,
            exclude: [/node_modules/, 'app.js.map'],
            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        }]
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.jsx', '.js']
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
}
