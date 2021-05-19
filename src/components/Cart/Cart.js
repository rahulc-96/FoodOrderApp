import React from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal"

const Cart = (props) => {
  const cartItems = (<ul className={styles["cart-items"]}> {[{ name: "Shushi" }].map((item) => <li> {item.name} </li>)} </ul>);
  const sumAmountForItemsInCart = 35.55;
  const totalAmount = `$${sumAmountForItemsInCart}`;
  return (
    <Modal onClose = {props.onClose}>
        {cartItems}
        <div className={styles.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={props.onClose}> Close</button>
          <button> Order </button>
        </div>
    </Modal>
  );
};

export default Cart;
