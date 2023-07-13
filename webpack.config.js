// noinspection WebpackConfigHighlighting

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
    {
        mode: 'production',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'copyshareify.js',
            library: 'CopyShareify-js',
            libraryTarget: 'umd', // or 'umd2'
            globalObject: 'this',
        },
        optimization: {
            minimize: false,
        },
    },
    {
        mode: 'production',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'copyshareify.min.js',
            library: 'CopyShareify-js',
            libraryTarget: 'umd', // or 'umd2'
            globalObject: 'this',
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                }),
            ],
        },
        plugins: [
            new TerserPlugin({
                extractComments: false,
            }),
        ]
    },
];