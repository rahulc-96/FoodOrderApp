import React, { useEffect, useContext, useState } from "react";
import styles from "./CartButton.module.css";
import CartIcon from "./CartIcon.js";
import CartContext from "../../context/CartContext";

const CartButton = (props) => {
  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);
  const cartContext = useContext(CartContext);
  const {items} = cartContext;
  const totalQuantity = items.reduce((currentQty, item) => currentQty + item.quantity, 0);
  const classes = `${styles.button} ${isButtonHighlighted ? styles.bump : ""}`;
  useEffect(() => {
    if(items.length === 0)
    return;
    setIsButtonHighlighted(true);
    const timer = setTimeout( () => setIsButtonHighlighted(false), 300);
    return () => {clearTimeout(timer)};
  }, [items])
  return (
    <button onClick={props.onShowCart} className={classes}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
