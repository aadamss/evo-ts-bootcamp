
import React from "react";
import {State} from "../types";
import {PizzaBasketItem} from "./PizzaBasketItem";
import {connect} from "react-redux";
import {pizzaRemove} from "../utils/storeActions";

interface PizzaBasketProps {
    basket: State["basket"],
    onMinus: (_id: string) => void;
}

const PizzaBasket: React.FC<PizzaBasketProps> = ({basket, onMinus}: PizzaBasketProps) => (
    <>
        {
            basket.map((p => <PizzaBasketItem
                _id={p._id}
                onMinus={onMinus}
                key={p._id}
                price={p.price}
                name={p.name}
                count={p.count}
            />))
        }
    </>
)

const stateProperties = (state: State) => ({
    basket: state.basket
})

const dispatchProperties = {
    onMinus: pizzaRemove
}

export default connect(
    stateProperties,
    dispatchProperties
)(PizzaBasket);
