/* eslint-disable quotes */
const compileConfig = require('../../baseconfig/babel.base');

console.log('NODE_ENV:', process.env.NODE_ENV);

const plugins = [
  ...compileConfig.plugins,
  [
    'module-resolver',
    {
      root: ['./'],
      alias: {
        core: './src/core',
        stores: './src/stores',
        lib: './src/lib',
      },
    },
  ],
];

const presets = ['@babel/typescript', ...compileConfig.presets];

// merge
const babelConfig = {
  ...compileConfig,
  presets,
  plugins,
};

module.exports = babelConfig;
