module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@api': './src/api',
          '@store': './src/store',
          '@actionTypes': './src/store/actionTypes',
          '@actions': './src/store/actions',
          '@selectors': './src/store/selectors',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@helpers': './src/helpers',
          '@styles': './src/styles',
          '@components': './src/components',
          '@assets': './assets',
          '@slices': './src/store/slices',
          '@types': './src/types',
        },
      },
    ],
  ],
};
