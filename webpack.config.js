const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

let plugins = []

const config = {
  entry: `${__dirname}/src/index.js`,
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: `${__dirname}/dist`,
    filename: 'library.min.js',
    library: 'library',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },

  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },

  plugins: plugins
}

module.exports = config
