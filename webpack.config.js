const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    entry: {
        App: __dirname + "/src/AppRender.js",
    },
    output: {
        path: __dirname + "/public/dist",
        filename: "[name]Bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    },
    // plugins: [
    //     new UglifyJsPlugin({ sourceMap: true })
    // ],
    // devtool: 'source-map'
}