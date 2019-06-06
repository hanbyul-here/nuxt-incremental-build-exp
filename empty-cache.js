const fs = require('fs-extra')
const path = require('path')

const isProduction = process.env.NODE_ENV === 'PRODUCTION'

const CACHE_PATH = isProduction
  ? path.join('/', 'opt', 'build', 'cache', 'nuxt_build') // Netlify cache path
  : path.resolve(__dirname, '.nuxt_build')

async function emptyCache() {
  try {
    await fs.emptyDir(CACHE_PATH)
  } catch (e) {
    console.log(e)
  }
}

;(async () => {
  // code goes here
  await emptyCache()
})()
