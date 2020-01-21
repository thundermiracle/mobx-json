const eslintrcCommon = require('../../baseconfig/eslintrc.ts.base');

module.exports = {
  ...eslintrcCommon,
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
};
