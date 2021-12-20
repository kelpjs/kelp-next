module.exports = {
  routes: [
    'get /:name? => Home#index'
  ],
  plugins: [
    'errorHandler',
    'static',
    'defaultHandler'
  ]
};