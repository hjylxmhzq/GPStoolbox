const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    target: 'electron-renderer',
    entry: [
        './src/renderer.js',
    ],
    output: {
        filename: '[name]_bundle.js',
        path: path.join(__dirname, 'dist')
    },
}
