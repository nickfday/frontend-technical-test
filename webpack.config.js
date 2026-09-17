const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const breakpoints = require("./src/config/breakpoints.json");

module.exports = {
    entry: {
        index: path.resolve(__dirname, "src", "index.js")
    },
    output: {
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        hot: true,
        inline: true,
        open: true,
        contentBase: path.join(__dirname, 'public')
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
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            // Feed the JS/SCSS breakpoint config (src/config/breakpoints.json) into every
                            // stylesheet as SCSS variables, so JS and SCSS share one source of truth.
                            additionalData: `$breakpoint-tablet: ${breakpoints.tablet}px; $breakpoint-desktop: ${breakpoints.desktop}px;`
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html")
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public", "api"),
                    to: "api"
                },
                {
                    from: path.resolve(__dirname, "public", "images"),
                    to: "images"
                }
            ],
        }),
    ]
};
