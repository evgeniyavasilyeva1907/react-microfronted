const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');
const dependencies = require('./package.json').dependencies;

const todoFormAppUrl ='http://localhost:3001';
const todoListAppUrl ='http://localhost:3002';

module.exports = {
    entry: "./src/bootstrap.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    mode: "production",
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
        }),
        new ModuleFederationPlugin({
            name: 'host_app',
            filename: 'remoteEntry.js',
            remotes: {
                "todoform_app": `todoform_app@${todoFormAppUrl}/remoteEntry.js`,
                "todolist_app": `todolist_app@${todoListAppUrl}/remoteEntry.js`,
            }, shared: { ...dependencies },
        }),
    ]
}
