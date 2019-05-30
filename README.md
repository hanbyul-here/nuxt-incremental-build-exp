Nuxt.js incremental build experiment

## How to run

Do initial build with
```
npm run initial-build
```
Then move the built files to `mock-cache-dir`
```
npm run mock-cache-dir
```

Generate files only for new route with
```
npm run incremental-build
```

Merge new build with initial build with
```
npm run merge
```
New build will get merged into the initial build in `cache-mock` directory.