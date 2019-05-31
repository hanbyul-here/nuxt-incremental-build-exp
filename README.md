Nuxt.js incremental build experiment

Nuxt.js allows partial build with `--no-build` command.

## How to run

Do initial build (`nuxt generate`) with
```
npm run initial-build
```
Then move the built directory to `mock-cache-dir` with command below. This will move `dist` and `.nuxt` to `cache-mock` dir,

```
npm run mock-cache-dir
```

Now, run the partial build with

```
npm run incremental-build
```

This will move `.nuxt` back to first level dir (Nuxt's partial build skips the build for common assets such as js, css. It references `.nuxt` folder to generate the path), then generate pages for dynamic routes.


Merge new(partial) build with initial build
```
npm run merge
```

New build will get merged into the initial build in `cache-mock/dist` directory.