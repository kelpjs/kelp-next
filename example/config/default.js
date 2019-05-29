module.exports = {
  routes: [
    'get /:name? => home#index'
  ],
  plugins: [
    'errorHandler',
    'static',
    'defaultHandler'
  ]
};