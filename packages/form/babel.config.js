/* eslint-disable quotes */
const compileConfig = require('../../babel.common');

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

// merge
const babelConfig = {
  ...compileConfig,
  plugins,
};

module.exports = babelConfig;
