const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const phaserPath = path.join(__dirname, "node_modules", "phaser-ce", "build", "custom");

module.exports = function(env, args = {}) {
    const prod = args.mode === "production";
    return {
        devtool: prod ? "source-map" : "eval-source-map",
        entry: {
            "app": "./src/main.ts",
            "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
            "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker.js",
        },
        mode: "development",
        module: {
            rules: [{
                exclude: /node_modules/,
                test: /\.(j|t)s$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.txt$/,
                use: "raw-loader",
            },]
        },
        output: {
            filename: "[name].js",
            globalObject: "self",
            path: path.resolve(__dirname, "dist"),
        },
        plugins: [
            new HtmlWebpackPlugin({
                chunks: ["app"],
                template: "index.html",
            }),
        ],
    };
};
