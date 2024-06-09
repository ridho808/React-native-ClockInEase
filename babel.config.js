module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ["nativewind/babel",[
    'module-resolver',
    {
      extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
      root: ['.'],
      alias: {
        '@api': './src/api',
        '@assets': './src/assets',
        '@components': './src/components',
        '@theme': './src/theme',
        '@utils': './src/utils',
        '@screen' : './src/screen',
        '@api' : './src/api',
        '@navigation' : './src/navigation',
        '@context' : './src/context'
      },
    },
  ],]
};
