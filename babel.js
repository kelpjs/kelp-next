require('@babel/register')({
  babelrc: false,
  plugins: [
    [ '@babel/plugin-transform-modules-commonjs' ],
    [ "@babel/plugin-proposal-decorators", { "legacy": true } ],
  ]
});