import { applyMiddleware, compose, createStore } from 'redux';
import { Store } from 'redux';
import { Middleware } from 'redux';
import thunk from 'redux-thunk';
import { Action, PizzaEvents, PizzaProperties, State } from '../types';
import { startingState, stateChanger } from './storeActions';

const getMiddleware: Middleware<{}, State> = ({ getState }) => (
  nextDispatch
) => (action: Action) => {
  const result: PizzaProperties = {
    eventName: action.type,
  };

  if (
    [PizzaEvents.PizzaAdded, PizzaEvents.PizzaRemoved].includes(action.type)
  ) {
    const payload = action.payload;
    const pizza = getState().pizza.filter((p) => p._id === payload)[0];
    result.pizzaName = pizza.name;
    result.pizzaPrice = pizza.price;
  }

  getServer(result);

  return nextDispatch(action);
};

export const pizzaStore: Store<State, Action> = createStore(
  stateChanger,
  startingState,
  compose(applyMiddleware(thunk, getMiddleware))
);

const getServer = (data: PizzaProperties) => {
  fetch('http://localhost:3001/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((json) => {
      console.log(json);
    })
    .catch((ex) => {
      console.log(ex);
    });
};
