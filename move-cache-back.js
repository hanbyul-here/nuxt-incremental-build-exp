const fs = require('fs-extra')
const path = require('path')

const isProduction = process.env.NODE_ENV === 'PRODUCTION'

const CACHE_PATH = isProduction
  ? path.join('/', 'opt', 'build', 'cache', 'nuxt_build') // Netlify cache path
  : path.resolve(__dirname, '.nuxt_build')

const BUILD_PATH = path.resolve(__dirname, 'dist')

async function putNuxtClientBack() {
  try {
    if (fs.existsSync(path.join(CACHE_PATH, '.nuxt'))) {
      await fs.move(path.join(CACHE_PATH, '.nuxt'), path.resolve(__dirname, '.nuxt'))
    }
  } catch (e) {
    console.log(e)
  }
}

;(async () => {
  // code goes here
  console.log('did it even..?')
  await putNuxtClientBack()
})()
