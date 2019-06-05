const fs = require('fs-extra')
const path = require('path')
const Rsync = require('rsync')

const isProduction = process.env.NODE_ENV === 'PRODUCTION'

const CACHE_PATH = isProduction
  ? path.join('/', 'opt', 'build', 'cache', 'nuxt_build') // Netlify cache path
  : path.resolve(__dirname, '.nuxt_build')

const BUILD_PATH = path.resolve(__dirname, 'dist')

const rsync = new Rsync()
  .shell('ssh')
  .flags('azq')
  .source(BUILD_PATH + '/')
  .destination(CACHE_PATH)

export async function cacheFinalFiles() {
  try {
    await fs.copy(BUILD_PATH, CACHE_PATH)
  } catch (e) {
    console.log(e)
  }
}

export async function cacheAndCopy() {
  try {
    await fs.ensureDir(CACHE_PATH)
    rsync.execute(async function(error, code, cmd) {
      if (!error) {
        await fs.copy(CACHE_PATH, BUILD_PATH)
        cacheFinalFiles()
        console.log('Please tell me you are well cached.')
      }
    })
  } catch (err) {
    // handle error
    console.log(err)
  }
}
