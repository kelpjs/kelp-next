// npm engines seems to be broken since npm v3.6.0.
// https://github.com/npm/npm/issues/12486
const semver = require('semver');
const { name, engines = {} } = require('./package');
// https://docs.npmjs.com/files/package.json#engines
Object.keys(engines).forEach(engine => {
  const current = process.versions[engine];
  const range = engines[engine];
  if (!semver.satisfies(current, range)) {
    console.error(`${name} requires ${engine} version ${range}, but current is ${current}`);
    process.exit(1);
  }
});