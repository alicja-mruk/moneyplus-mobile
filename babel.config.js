module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxRuntime: 'automatic' }],
      'module:metro-react-native-babel-preset',
    ],
    env: {
      test: {
        plugins: ['@babel/plugin-transform-runtime'],
      },
    },
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            api: './src/api',
            assets: './src/assets',
            components: './src/components',
            config: './src/config',
            contexts: './src/contexts',
            hooks: './src/hooks',
            modules: './src/modules',
            screens: './src/screens',
            services: './src/services',
            utils: './src/utils',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
