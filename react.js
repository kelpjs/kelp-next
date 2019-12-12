const ssr = require('kelp-ssr');
const render = require('./render');
const $import = require('./import');

const react = (page, state, options) => {
  const Page = $import(`@client/pages/${page}`);
  const html = ssr(Page, state, options);
  return render('react', { page, html });
};

module.exports = react;