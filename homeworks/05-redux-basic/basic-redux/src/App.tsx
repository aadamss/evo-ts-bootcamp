import React from 'react';
import { Store, createStore, Action, Reducer, compose } from 'redux';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          No UI available! Please check with Dev Tools!
        </p>
      </header>
    </div>
  );
}

interface BalanceUpdate extends Action<'UPDATE_BALANCE'> {
    type: 'UPDATE_BALANCE';
    payload: number;
}

interface Debit extends Action<'DEBIT'> {
    type: 'DEBIT';
    payload: number;
}

interface Credit extends Action<'CREDIT'> {
    type: 'CREDIT';
    payload: number;
}

interface FetchTaxedBalance extends Action<'GET_BALANCE_WITH_TAX'> {
    type: 'GET_BALANCE_WITH_TAX';
    payload: number;
}

type Transactions = BalanceUpdate | Credit | Debit | FetchTaxedBalance

const reducer: Reducer<number, Transactions> = (state: number = 0, action: Transactions) => {
    switch (action.type) {
        case 'UPDATE_BALANCE':
            return action.payload;

        case 'CREDIT':
          return state + action.payload;
          
        case 'DEBIT':
            return state - action.payload;

        case 'GET_BALANCE_WITH_TAX':
            return state - state * action.payload / 100;

        default:
            return state;
    }
};

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose

const store: Store<number, Transactions> = createStore(
    reducer,
    composeEnhancers()
);

const actions: Transactions[] = [
    { type: "UPDATE_BALANCE", payload: 1000.0 },
    { type: "CREDIT", payload: 200.0 },
    { type: "CREDIT", payload: 100.0 },
    { type: "GET_BALANCE_WITH_TAX", payload: 14.0 },
    { type: "DEBIT", payload: 250.0 },
    { type: "UPDATE_BALANCE", payload: 1000.0 },
];

actions.forEach((action) => store.dispatch(action));

export default App;
