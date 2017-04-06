const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const srcPath = path.join(__dirname, "src");

module.exports = () => {
    return {
        context: srcPath,

        entry: {
            "vendor": [
                "react", 
                "react-dom",
                "unfetch",
                "immutable"
            ],

            "app/app.build": [
                "app"
            ],

            "assets/css/app.css": [
                "assets/scss/index.scss"
            ]
        },

        output: {
            path: srcPath,
            filename: "[name].js"
        },

        resolve: {
            extensions: [".js", ".jsx"]
        },

        module: {
            rules: [
                // For JS/JSX files
                { 
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            query: {
                                presets: [
                                    "react",
                                    ["es2015", { modules: false } ]
                                ]
                            }
                        }
                    ],
                },

                // For SCSS files
                {
                    test: /\.scss?$/,
                    exclude: /node_modules/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader?sourceMap"
                    ]
                }
            ]
        },

        plugins: [
            // Group files into common chunks
            new webpack.optimize.CommonsChunkPlugin({
                name: ["vendor"],
                filename: "assets/js/[name].js"
            }),

            // Create HTML template
            new HtmlWebpackPlugin({
                template: path.join(srcPath, "index-tpl.html"),
                filename: "index.html",
                hash: true,
                chunks: [
                    "vendor",
                    "app/app.build"
                ]
            }),

            // For HMR
            new webpack.HotModuleReplacementPlugin(),

            // Prints more readable module names in the browser console on HMR updates
            new webpack.NamedModulesPlugin()
        ],

        // Set up webpack-dev-server
        devServer: {
            contentBase: srcPath,
            inline: true,
            hot: true
        }
    };
};
