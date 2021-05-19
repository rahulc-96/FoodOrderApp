import React, { useContext } from "react";
import styles from "./CartButton.module.css";
import CartIcon from "./CartIcon.js";
import CartContext from "../../context/CartContext";

const CartButton = (props) => {
  const cartContext = useContext(CartContext);
  const totalQuantity = cartContext.items.reduce(
    (currentQty, item) => currentQty + item.quantity, 0);
  return (
    <button onClick={props.onShowCart} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
