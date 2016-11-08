// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('atool-build/lib/webpack');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const pkg = require('./package.json');

module.exports = function(webpackConfig) {
  webpackConfig.resolve.root = [
    path.join(__dirname, 'src'),
  ];

  webpackConfig.plugins.unshift(new SpritesmithPlugin({
    src: {
      cwd: path.resolve(__dirname, 'resource/images/uaIcon'),
      glob: '*.png',
    },
    target: {
      image: path.resolve(__dirname, 'resource/images/uaIcon-sprite.png'),
      css: path.resolve(__dirname, 'src/styles/ua-icon-sprite.less'),
    },
    apiOptions: {
      cssImageRef: '../../resource/images/uaIcon-sprite.png',
    },
  }));

  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['antd', {
    style: 'css',
  }]);

  // Enable this if you have to support IE8.
  // webpackConfig.module.loaders.unshift({
  //   test: /\.jsx?$/,
  //   loader: 'es3ify-loader',
  // });

  // eslint-disable-next-line no-param-reassign
  webpackConfig.output.publicPath = `/${pkg.version}/`;

  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: '../index.html',
    template: './index_template.ejs',
    minify: {
      collapseWhitespace: false,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
    },
  }));

  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach((loader) => {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.test = /\.dont\.exist\.file/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.test = /\.less$/;
    }
  });

  // Load src/entries/*.js as entry automatically.
  const files = glob.sync('./src/entries/*.js');
  const newEntries = files.reduce((memo, file) => {
    const name = path.basename(file, '.js');
    memo[name] = file;
    return memo;
  }, {});

  webpackConfig.entry = Object.assign({}, webpackConfig.entry, newEntries);

  return webpackConfig;
};
