const base = require('./baseconfig/jest.config.base');

module.exports = {
  ...base,
  projects: ['<rootDir>/packages/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/',
};
