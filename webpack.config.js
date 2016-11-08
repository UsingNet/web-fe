// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('atool-build/lib/webpack');
const path = require('path');
const glob = require('glob');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = function(webpackConfig) {
  webpackConfig.output.publicPath = '/';
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

  webpackConfig.module.loaders = [{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: webpackConfig.babel,
  }, {
    test(filePath) {
        return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath);
    },
    loader: 'style!css-loader!postcss',
  }, {
    test: /\.module\.css$/,
    loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss',
  }, {
    test(filePath) {
        return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
    },
    loader: 'style!css?!postcss!less-loader',
  }, {
    test: /\.module\.less$/,
    loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less-loader',
  }, {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff',
  }, {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff',
  }, {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream',
  }, {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file',
  }, {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml',
  }, {
    test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=10000',
  }, {
    test: /\.json$/, loader: 'json',
  }, {
    test: /\.html?$/, loader: 'file?name=[name].[ext]',
  }];

  // Enable this if you have to support IE8.
  // webpackConfig.module.loaders.unshift({
  //   test: /\.jsx?$/,
  //   loader: 'es3ify-loader',
  // });

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
