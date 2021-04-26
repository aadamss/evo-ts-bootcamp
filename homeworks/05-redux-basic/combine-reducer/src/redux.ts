export type Action = {
  type: string
  payload?: any
}

export type Store<T> = {
  getState: () => T
  subscribe: (listener: (state: T, action: Action) => void) => void
  dispatch: (action: Action) => void
}

export function createStore<T>(reducer: any) {
  let state: T
  let listeners: Array<(state: T, action: Action) => void> = []

  const store: Store<T> = {
    getState: function () {
      return state
    },
    subscribe: x => {
      listeners.push(x)
    },
    dispatch: function (action) {
      state = reducer(state, action)
      listeners.forEach(x => x(state, action))
    }
  }

  store.dispatch({type: 'init'})

  return store
}

type reducer = (state: number, action: Action) => number

type allReducers = {
  [key: string]: reducer
}

export function CombineReducers(allReducers: allReducers) {
  return function (state: any = {}, action: Action) {
    const allReducersPairs = Object.entries(allReducers)
    let newState: any = {}
    if (allReducersPairs.length > 0) {
      allReducersPairs.forEach(([key, reducer]) => {
        const stateFieldValue = reducer(state[key], action)
        newState[key] = stateFieldValue
      })
    }

    return newState
  }
}
