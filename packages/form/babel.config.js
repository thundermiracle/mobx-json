/* eslint-disable quotes */
const compileConfig = require('../../babel.common');

const plugins = [
  ...compileConfig.plugins,
  [
    'module-resolver',
    {
      root: ['./'],
      alias: {
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

// console.log(JSON.stringify(babelConfig, 0, 2));

module.exports = babelConfig;
