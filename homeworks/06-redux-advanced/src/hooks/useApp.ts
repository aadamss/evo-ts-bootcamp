import React from 'react';
import { State } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { pizzaDisplay } from '../utils/storeActions';

export function useApp() {
  const dispatch = useDispatch();
  const pizza = useSelector((state: State) => state.pizza);
  const pizzaBasket = useSelector((state: State) => state.basket);

  React.useEffect(() => {
    dispatch(pizzaDisplay());
  }, [dispatch]);

  return {
    totalPrice: pizzaBasket.reduce(
      (acc, pizza) => acc + pizza.price * pizza.count,
      0
    ),
    noPizzas: pizza.length === 0,
    emptyBasket: pizzaBasket.length === 0,
  };
}
