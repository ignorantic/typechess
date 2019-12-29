const withFonts = require('next-fonts');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

module.exports = withFonts({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    // config.module.rules.push({
    //   enforce: 'pre',
    //   test: /\.(js)$/,
    //   loader: 'eslint-loader',
    //   exclude: /node_modules/,
    // });
    return config;
  },
});
