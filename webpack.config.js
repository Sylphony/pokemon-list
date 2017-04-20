const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const path = require("path");

const env = (process.env.NODE_ENV) ? process.env.NODE_ENV : "development";

const srcPath = path.join(__dirname, "src");
const distPath = path.join(__dirname, "gh-pages");

const mainCfg = {
    context: srcPath,

    entry: {
        "vendor": [
            "react", 
            "react-dom",
            "axios",
            "immutable",
            "classnames"
        ],

        "app/app.build": [
            "./app/app",
            "./assets/scss/index.scss"
        ],
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
                            ],
                            plugins: [
                                "transform-object-rest-spread"
                            ]
                        }
                    }
                ],
            },

            // For SCSS files
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { 
                            loader: "css-loader",
                            options: {
                                minimize: !(env === "development") 
                            }
                        },
                        "sass-loader?sourceMap"
                    ],
                })
            }
        ]
    },

    plugins: [
        // Set the environment variables
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify(env)
            }
        }),

        // Group files into common chunks
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor"],
            filename: "assets/js/[name].js"
        }),

        // Create HTML template
        new HtmlWebpackPlugin({
            template: path.join(srcPath, "index-tpl.html"),
            filename: "index.html",
            chunks: [
                "vendor",
                "app/app.build"
            ]
        }),

        // Extract Sass to CSS file
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath("[name].css").replace("app/app.build", "assets/css/index");
            },
            disable: (env === "development")
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


const distCfg = merge(mainCfg, {
    output: {
        path: distPath,
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { 
                warnings: false 
            }
        })
    ]
});

module.exports = () => {
    return (env === "production") ? distCfg : mainCfg;
};
