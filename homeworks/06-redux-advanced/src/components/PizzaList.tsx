import React from "react";
import { PizzaItem } from "./PizzaItem";
import {connect} from "react-redux";
import {pizzaAdd} from "../utils/storeActions";
import {State} from "../types";

interface PizzaListProps {
    pizza: State["pizza"];
    onAdd: (_id: string) => void;
}

const PizzaList: React.FC<PizzaListProps> = ({pizza, onAdd}) => (
    <>
        {
            pizza.map(p => <PizzaItem
                key={p._id}
                _id={p._id}
                name={p.name}
                price={p.price}
                onAdd={onAdd}
            />)
        }
    </>
)

const stateProperties = (state: State) => ({
    pizza: state.pizza
})

const dispatchProperties = {
    onAdd: pizzaAdd
}

export default connect(
    stateProperties,
    dispatchProperties
)(PizzaList);