module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      'nativewind/babel',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
