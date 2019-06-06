const fs = require('fs-extra')
const path = require('path')

const isProduction = process.env.NODE_ENV === 'PRODUCTION'

const CACHE_PATH = isProduction
  ? path.join('/', 'opt', 'build', 'cache', 'nuxt_build') // Netlify cache path
  : path.resolve(__dirname, '.nuxt_build')

const BUILD_PATH = path.resolve(__dirname, 'dist')

async function putNuxtClientBack() {
  if (fs.existsSync(path.join(CACHE_PATH, '.nuxt'))) {
    console.log('yes tehre is')
    await fs.move(path.join(CACHE_PATH, '.nuxt'), path.resolve(__dirname, '.nuxt'))
    console.log('done moving')
  }
}

;(async () => {
  // code goes here
  await putNuxtClientBack()
})()