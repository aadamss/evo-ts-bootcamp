import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {pizzaStore} from "./utils/pizzaStore";

ReactDOM.render(
      <React.StrictMode>
          <Provider store={pizzaStore}>
              <App />
          </Provider>
      </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
