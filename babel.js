require('@babel/register')({
  babelrc: false,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    [ '@babel/plugin-transform-modules-commonjs' ],
    [ "@babel/plugin-proposal-decorators", { legacy: true } ],
  ]
});