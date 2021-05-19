import CartContext from "./CartContext";
import React, { useReducer } from "react";

const CartContextProvider = (props) => {
  const removeItemHandler = (id) => {
    cartDispatcher({ type: "REMOVE ITEM", id: id });
  };

  const defaultState = {
    items: [],
    totalAmount: 0,
  };

  const getExistingItemIndex = (items, newItemId) => {
    return items.findIndex((item) => item.id === newItemId);
  };

  const cartReducer = (prevState, action) => {
    if (action.type === "ADD ITEM") {
      const updatedTotalAmount =
        prevState.totalAmount + action.item.quantity * action.item.price;
      let updatedItemsList;
      const existingItemIndex = getExistingItemIndex(
        prevState.items,
        action.item.id
      );
      const existingItem = prevState.items[existingItemIndex];
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: action.item.quantity + existingItem.quantity,
        };
        updatedItemsList = [...prevState.items];
        updatedItemsList[existingItemIndex] = updatedItem;
      } else {
        updatedItemsList = prevState.items.concat(action.item);
      }
      return { items: updatedItemsList, totalAmount: updatedTotalAmount };
    }

    if (action.type === "REMOVE ITEM") {
      let updatedItemsList;
      const existingItemIndex = getExistingItemIndex(
        prevState.items,
        action.id
      );
      const existingItem = prevState.items[existingItemIndex];
      const updatedTotalAmount = prevState.totalAmount - existingItem.price;
      if (existingItem.quantity === 1) {
        updatedItemsList = prevState.items.filter(
          (item) => item.id !== action.id
        );
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedItemsList = [...prevState.items];
        updatedItemsList[existingItemIndex] = updatedItem;
      }
      return { items: updatedItemsList, totalAmount: updatedTotalAmount };
    }
    return defaultState;
  };

  const [cartState, cartDispatcher] = useReducer(cartReducer, defaultState);

  const addItemHandler = (item) => {
    cartDispatcher({ type: "ADD ITEM", item: item });
  };
  const contextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
