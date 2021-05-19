import React, { useContext } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../context/CartContext";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const addHandler = (item) => {
    cartContext.addItem({ ...item, quantity: 1 });
  };

  const removeHandler = (id) => {
    cartContext.removeItem(id);
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          onAdd={addHandler.bind(null, item)}
          onRemove={removeHandler.bind(null, item.id)}
          key={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onClose}> Close</button>
        {hasItems && <button> Order </button>}
      </div>
    </Modal>
  );
};

export default Cart;
