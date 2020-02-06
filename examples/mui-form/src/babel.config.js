module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          blueprints: './src/blueprints',
          views: './src/views',
          services: './src/services',
        },
      },
    ],
  ],
};
