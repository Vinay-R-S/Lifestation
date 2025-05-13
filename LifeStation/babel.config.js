module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-flow',
    ],
    plugins: [
      'expo-router/babel',
      '@babel/plugin-transform-flow-strip-types',
      '@babel/plugin-transform-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
  };
}; 