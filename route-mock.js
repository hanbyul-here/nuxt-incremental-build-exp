const routesNum = 22

const initialRoutes = Array.apply(null, { length: routesNum - 1 })
  .map(Number.call, Number)
  .map(e => ({
    route: `subroute-${e}`,
    payload: {
      content: `this is subroute ${e} contents`
    }
  }))

const additionalRoutes = [
  {
    route: `subroute-${routesNum - 1}`,
    payload: {
      content: `this is subroute ${routesNum - 1} contents`
    }
  }
]

const initialTotalRoutes = initialRoutes
const additionalTotalRoutes = initialRoutes.concat(additionalRoutes)

module.exports = {
  initialRoutes,
  additionalRoutes,
  initialTotalRoutes,
  additionalTotalRoutes
}
