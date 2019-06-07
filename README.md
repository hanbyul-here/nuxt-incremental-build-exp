# Nuxt.js incremental build experiment with Netlify.

This repo is a proof of concept for incremental build strategy using Nuxt in Netlify environment.

## Why

My website is going to have thousands of posts! Nuxt will have hard time generating all these routes/pages. Netlify always deploys things  What can I do?

### How

Nuxt can build a portion of a site at one time through `--no-build` flag with `generate` command. When `--no-build` flag is set, Nuxt doesn’t generate common assets such as js, css files, only generates the routes(pages) passed through `generate.routes` in `nuxt.config`.

However, `--no-build` flag assumes that there was previous build before, (`nuxt build`, or `nuxt generate` without no build flag ran before.) because Nuxt needs to let newly generated page know about the common assets. Based on the error Nuxt throws ` ✖ Nuxt Fatal Error: ENOENT: no such file or directory, stat '/Users/hjo/Documents/aclu/nuxt-incremental-build/.nuxt/dist/client'`, Nuxt seems to check the previous build by checking if the files from the previous build exist in expected path.

Netlify runs every deploy as a clean build. There is no trace of previous build when new deploy kicks in. So if `nuxt generate --no-build` runs in Netlify environment, Nuxt will throw an error that it cannot find the previous build info. However, it turns out that there is a known-secret, one folder that persists through the builds! which is : `/opt/build/cache` . (This is not a documented feature, but it is there, believe me!) So I decided to move the data that I need for next build to this cache folder after each build, and move those data back to expected path before each build.

In `generate:done` hook from `nuxt.config`, `dist` and `.nuxt` folder get cached in cache folder (this hook gets triggered regardless of flags). the caching process includes rsyncing newly generated dist dir to previously generated dist dir, copy merged directory to deploy dir (`dist`), so that Netlify deploys all the pages, not only newly generated ones. [The script is in this file.](https://github.com/hanbyul-here/nuxt-incremental-build-exp/blob/master/cache-me.js)

Incremental build command includes putting cached `.nuxt` folder back to build directory before generate process kicks in. [The script is in this file.](https://github.com/hanbyul-here/nuxt-incremental-build-exp/blob/master/move-cache-back.js)

When I update common assets such as Nav, Footer, I would need to empty out the cache and build all pages from the clean plate. When `npm run clean-build` runs, the script cleaning out all the caches runs before nuxt generates routes without flags. [The script is in this file.](https://github.com/hanbyul-here/nuxt-incremental-build-exp/blob/master/empty-cache.js)

🌟 ‘Caching for the win section’ in this article was very, very helpful: https://www.contentful.com/blog/2018/05/17/faster-static-site-builds-part-one-process-only-what-you-need/#caching-for-the-win

### OK, Can I run this locally?

Yes yes yes. Nuxt will use `.nuxt_build` folder instead of Netlify' cache folder if it runs on local (without NODE_ENV=PRODUCTION env var set). Also there are some manual code swaps needed. You still want to run on local? cool.

1. Do that npm thing.

```
npm install
```

2. Change [route variable values in nuxt.config file](https://github.com/hanbyul-here/nuxt-incremental-build-exp/blob/master/nuxt.config.js#L5-L6)
```js
// nuxt.config.js#L3-L6)
const { initialRoutes, additionalRoutes, initialTotalRoutes, additionalTotalRoutes } = mockRoutes

// const routesToGenerate = additionalRoutes
// const routesList = additionalTotalRoutes

const routesToGenerate = initialRoutes
const routesList = initialTotalRoutes
```

3. Run your first build!

```
npm run generate
```
This will build all the assets you need, landing page and 10 subdirectory from `subroute-0` to `subroute-9`.

4. Now it is time to do your partial build. [change the variable back in nuxt.config](https://github.com/hanbyul-here/nuxt-incremental-build-exp/blob/master/nuxt.config.js#L5-L6)

```js
// nuxt.config.js#L3-L6)
const { initialRoutes, additionalRoutes, initialTotalRoutes, additionalTotalRoutes } = mockRoutes

const routesToGenerate = additionalRoutes
const routesList = additionalTotalRoutes
```

5. Run partial build command!

```
npm run incremental-build
```

This command will build a landing page, and 1 subdirectory `subroute-10`. When you check dist folder though, there should be all the subdirectory from the previous build (from `subroute-0` to `subroute-10`) You can keep testing incremental build by increasing number of `routesNum` variable in [route-mock.js](https://github.com/hanbyul-here/nuxt-incremental-build-exp/blob/master/route-mock.js#L1).

