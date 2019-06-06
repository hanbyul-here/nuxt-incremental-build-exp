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
    route: 'subroute-d',
    payload: {
      content: 'this is subroute d contents'
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
