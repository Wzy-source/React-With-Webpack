const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// style files regexes
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
// common function to get style loaders

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]_[chunkhash:8].bundle.js",
  },
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    open: false,
    hot: true,
    port: 8080,
    compress: true,
    static: {
      directory: path.join(__dirname, "./dist"),
    },
  },
  resolve: {
    //模块解析，这样使得import语句可以不带拓展名，并使用...访问webpack内置的默认拓展名
    extensions: [".tsx", ".ts", ".jsx", ".js", ".scss", ".css", "..."],
  },
  module: {
    rules: [
      //js file
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          //babel主要用于源代码的转换，包括ES2015以后的代码，以及React JSX形式的代码转换
          loader: "babel-loader", //使用 babel-loader进行编译。在babel执行编译的过程中，会从项目根目录下的配置文件读取配置
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], //选择使用的编译器
            plugins: [
              [
                "react-css-modules",
                {
                  generateScopedName: "[local]-[hash:base64:10]",
                  filetypes: {
                    ".scss": {
                      syntax: "postcss-scss",
                    },
                  },
                },
              ],
            ],
          },
        },
      },
      //tsx/ts file
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript", "@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      //Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      //字体
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      //scss
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: sassModuleRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]-[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    //该插件将在dist目录下以index.html为模板生成一个html file
    //并在body处以<script>标签的形式引入了构建出来的结果
    new HtmlWebpackPlugin({
      title: "一定要好好学习React和Webpack啊", //展示在网站标签上的名字
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new friendlyErrorsWebpackPlugin(),
    //将css提取单独文件
    new MiniCssExtractPlugin(),
  ],
  //缓存
  cache: {
    type: "filesystem",
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename],
      // 默认情况下 webpack 与 loader 是构建依赖。
    },
  },
};
