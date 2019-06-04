const fs = require('fs-extra')
const Rsync = require('rsync')

const isProduction = process.env.NODE_ENV === 'PRODUCTION'
const CACHE_PATH = isProduction
  ? path.join('/', 'opt', 'build', 'cache', 'nuxt_build') // Netlify cache path
  : path.resolve(__dirname, '.nuxt_build')

const BUILD_PATH = path.resolve(__dirname, 'dist')

var rsync = new Rsync()
  .shell('ssh')
  .flags('azq')
  .source(BUILD_PATH)
  .destination(CACHE_PATH);

function cacheFinalFiles() {
  fs.copy((BUILD_PATH, CACHE_PATH)
  .then(() => console.log('successssss'))
  .catch(err => console.error(err))
}

fs.ensureDir(CACHE_PATH)
  .then(() => {
    rsync.execute(function(error, code, cmd) {
      // we're done
      if(!error) {
        fs.copy(CACHE_PATH, BUILD_PATH)
        .then(() => cacheFinalFiles())
        .catch(err => console.error(err))
      }
    })
  })
