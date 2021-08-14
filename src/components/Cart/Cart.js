import React, { useState, useContext } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../context/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttpClient from "../../customHook/useHttpClient";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;
  const { isLoading, isError, sendRequest: placeOrder } = useHttpClient();
  const addHandler = (item) => {
    cartContext.addItem({ ...item, quantity: 1 });
  };

  const removeHandler = (id) => {
    cartContext.removeItem(id);
  };

  const onConfirmHandler = () => {
    setConfirmOrder(true);
  };

  const placeOrderHandler = (userData) => {
    placeOrder(
      {
        url: "https://food-cart-6307a-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: { user_details: userData, ordered_items: cartContext.items },
        headers: { "Content-Type": "application/json" },
      },
      updateOrderId
    );
  };

  const updateOrderId = (response) => {
    setOrderId(response.name);
    cartContext.clearCart();
    setConfirmOrder(false)
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

  const modalActions = (
    <div>
      <div className={styles.actions}>
        <button onClick={props.onClose}> Close</button>
        {hasItems && <button onClick={onConfirmHandler}> Order </button>}
      </div>
    </div>
  );

  const cartOrderContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {confirmOrder && hasItems && (
        <Checkout onConfirm={placeOrderHandler} onCancel={props.onClose} />
      )}
      {(!confirmOrder || !hasItems) && modalActions}
    </React.Fragment>
  );

  const errorContent = (
    <React.Fragment>
      <p>Error occurred while placing your order. Please try again</p>
    </React.Fragment>
  );
  const submittingContent = <p>Your order is being processed</p>;
  const successContent = (
    <React.Fragment>
      <p> Your order has been successfully placed. Order id: {orderId}.</p>
      <div className={styles.actions}> <button onClick={props.onClose}> Close</button></div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isLoading && (orderId == null) && cartOrderContent}
      {isLoading && !isError && submittingContent}
      {isError && errorContent}
      {orderId != null && !isError && !isLoading && successContent}
    </Modal>
  );
};

export default Cart;
