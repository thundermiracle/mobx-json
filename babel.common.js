console.log(`[babel mode]: ${process.env.NODE_ENV}`);

const babelCommonConfig = {
  presets: ['@babel/typescript', '@babel/env', '@babel/react'],
  plugins: [
    'add-module-exports',
    'react-require',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-object-rest-spread',
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        regenerator: true,
      },
    ],
    [
      'import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'tree-shaking-mui-core',
    ],
    [
      'import',
      {
        libraryName: '@material-ui/icons',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'tree-shaking-mui-icons',
    ],
  ],
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types'],
    },
  },
};

module.exports = babelCommonConfig;
