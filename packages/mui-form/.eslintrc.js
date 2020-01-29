const eslintrcCommon = require('../../baseconfig/eslintrc.ts.base');

module.exports = {
  ...eslintrcCommon,
  rules: {
    ...eslintrcCommon.rules,
    '@typescript-eslint/no-explicit-any': 0,
    'react/prop-types': 0,
  },
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
