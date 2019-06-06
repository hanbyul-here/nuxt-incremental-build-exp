const fs = require('fs-extra')
const path = require('path')

const isProduction = process.env.NODE_ENV === 'PRODUCTION'

const CACHE_PATH = isProduction
  ? path.join('/', 'opt', 'build', 'cache', 'nuxt_build') // Netlify cache path
  : path.resolve(__dirname, '.nuxt_build')

const BUILD_PATH = path.resolve(__dirname, '.nuxt')

async function putNuxtClientBack() {
  try {
    await fs.copy(CACHE_PATH + '/.nuxt', BUILD_PATH)
  } catch (e) {
    console.log(e)
  }
}

;(async () => {
  // code goes here
  console.log('did it even..?')
  await putNuxtClientBack()
})()
