const initialRoutes = [
  {
    route: 'subroute-a',
    payload: {
      content: 'this is subroute a contents'
    }
  },
  {
    route: 'subroute-b',
    payload: {
      content: 'this is subroute b contents'
    }
  }
]

const additionalRoutes = [
  {
    route: 'subroute-c',
    payload: {
      content: 'this is subroute c contents'
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
