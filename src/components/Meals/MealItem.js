import React, { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../context/CartContext";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cartContext = useContext(CartContext);
  const updateQuantityHandler = (quantity) => {
    const item = {
      id: props.id,
      name: props.title,
      price: props.price,
      quantity: quantity,
    };
    cartContext.addItem(item);
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.title}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <MealItemForm onUpdateQuantity={updateQuantityHandler} id={props.id} />
    </li>
  );
};

export default MealItem;
