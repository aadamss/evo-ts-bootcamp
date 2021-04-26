import {createStore, Action, CombineReducers} from './redux'

export const INCREMENTFIRST = 'incrementFirst'
export const DECREMENTFIRST = 'decrementFirst'
export const INCREMENTSECOND = 'incrementSecond'
export const DECREMENTSECOND = 'decrementSecond'

const counterOne = (state: number = 0, action: Action) => {
  const {type} = action

  if (type === INCREMENTFIRST) {
    const newState = state + 1
    return newState
  }

  if (type === DECREMENTFIRST) {
    const newState = state - 1
    return newState
  }

  return state
}

const counterTwo = (state: number = 0, action: Action) => {
  const {type} = action

  if (type === INCREMENTSECOND) {
    const newState = state + 1
    return newState
  }

  if (type === DECREMENTSECOND) {
    const newState = state - 1
    return newState
  }

  return state
}

const store = createStore<{[key: string]: number}>(
  CombineReducers({counterFirst: counterOne, counterSecond: counterTwo})
)

const BTN_INCREMENT_FIRST = 'btn-inc-first'
const BRN_DECREMENT_FIRST = 'btn-dec-first'
const BTN_INCREMENT_SECOND = 'btn-inc-second'
const BTN_DECREMENT_SECOND = 'btn-dec-second'
const VALUE_FIRST = 'counter-first'
const VALUE_SECOND = 'counter-second'

const btnIncrementFirst = document.querySelector(`#${BTN_INCREMENT_FIRST}`)
const btnDecrementFirst = document.querySelector(`#${BRN_DECREMENT_FIRST}`)
const btnIncrementSecond = document.querySelector(`#${BTN_INCREMENT_SECOND}`)
const btnDecrementSecond = document.querySelector(`#${BTN_DECREMENT_SECOND}`)
const counterFirst = document.querySelector(`#${VALUE_FIRST}`)
const counterSecond = document.querySelector(`#${VALUE_SECOND}`)

if (counterFirst && store.getState().counterFirst !== undefined) {
  counterFirst.textContent = (store.getState()
    .counterFirst as number).toString()
}

if (counterSecond && store.getState().counterSecond !== undefined) {
  counterSecond.textContent = (store.getState()
    .counterSecond as number).toString()
}

if (btnIncrementFirst) {
  btnIncrementFirst.addEventListener('click', () => {
    store.dispatch({type: INCREMENTFIRST})
  })
}

if (btnDecrementFirst) {
  btnDecrementFirst.addEventListener('click', () => {
    store.dispatch({type: DECREMENTFIRST})
  })
}

if (btnIncrementSecond) {
  btnIncrementSecond.addEventListener('click', () => {
    store.dispatch({type: INCREMENTSECOND})
  })
}

if (btnDecrementSecond) {
  btnDecrementSecond.addEventListener('click', () => {
    store.dispatch({type: DECREMENTSECOND})
  })
}

store.subscribe((state, action) => {
  console.log('1', state, action)
  if (counterFirst && state.counterFirst !== undefined) {
    counterFirst.textContent = (state.counterFirst as number).toString()
  }
  if (counterSecond && state.counterSecond !== undefined) {
    counterSecond.textContent = (state.counterSecond as number).toString()
  }
})

store.subscribe((state, action) => {
  console.log('2', state, action)
})
