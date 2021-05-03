export type Pizza = {
  name: string;
  price: number;
  _id: string;
};

export type State = {
  pizza: Pizza[];
  basket: Array<Pizza & { count: number }>;
};

export interface Action {
  type: PizzaEvents;
  payload?: any;
}

export interface PizzaProperties {
  eventName: PizzaEvents;
  pizzaName?: string;
  pizzaPrice?: number;
}

export enum PizzaEvents {
  PizzaSelected = 'PIZZA_SELECTED',
  PizzaAdded = 'PIZZA_ADDED_INTO_BASKET',
  PizzaRemoved = 'PIZZA_REMOVED_FROM_BASKET',
}
