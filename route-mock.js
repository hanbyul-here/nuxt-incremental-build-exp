export const initialRoutes = [
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

export const additionalRoutes = [
  {
    route: 'subroute-c',
    payload: {
      content: 'this is subroute c contents'
    }
  }
]

export const initialTotalRoutes = initialRoutes
export const additionalTotalRoutes = initialRoutes.concat(additionalRoutes)
