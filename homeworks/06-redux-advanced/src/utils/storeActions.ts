import { ThunkAction } from 'redux-thunk';
import { getPizza } from '../services/api';
import { Action, PizzaEvents, Pizza, State } from '../types';
import { Dispatch } from 'react';
import { Reducer } from 'redux';

export function pizzaDisplay(): ThunkAction<Promise<void>, State, {}, Action> {
  return function (dispatch, getState) {
    return new Promise((resolve) => {
      getPizza().then((pizza) => {
        dispatch({
          type: PizzaEvents.PizzaSelected,
          payload: pizza.items,
        });
      });
      resolve();
    });
  };
}

export function pizzaAdd(_id: string) {
  return function (dispatch: Dispatch<Action>, getState: () => State) {
    dispatch({
      type: PizzaEvents.PizzaAdded,
      payload: _id,
    });
  };
}

export function pizzaRemove(_id: string) {
  return function (dispatch: Dispatch<Action>, getState: () => State) {
    dispatch({
      type: PizzaEvents.PizzaRemoved,
      payload: _id,
    });
  };
}

export const startingState: State = {
  pizza: [],
  basket: [],
};

export const stateChanger: Reducer<State, Action> = (
  state = startingState,
  action
) => {
  switch (action.type) {
    case PizzaEvents.PizzaSelected:
      return {
        ...state,
        pizza: [...action.payload],
      };
    case PizzaEvents.PizzaAdded: {
      let basketCopy = [...state.basket];
      const pizzaPosition: number = basketCopy.findIndex(
        (pizza) => pizza._id === action.payload
      );
      const pizza: Pizza = state.pizza.filter(
        (x) => x._id === action.payload
      )[0];

      if (pizzaPosition === -1) {
        return {
          ...state,
          basket: [...state.basket, { ...pizza, count: 1 }],
        };
      } else {
        basketCopy[pizzaPosition].count++;
        return {
          ...state,
          basket: basketCopy,
        };
      }
    }
    case PizzaEvents.PizzaRemoved: {
      const pizzaPosition: number = state.basket.findIndex(
        (pizza) => pizza._id === action.payload
      );
      let basketCopy = [...state.basket];
      basketCopy[pizzaPosition].count--;
      if (basketCopy[pizzaPosition].count === 0) {
        basketCopy = basketCopy.filter((pizza) => pizza._id !== action.payload);
      }
      return {
        ...state,
        basket: basketCopy,
      };
    }
    default:
      return state;
  }
};
