import CartContext from "./CartContext";
import React , {useReducer} from "react";

const CartContextProvider = (props) => {
  const removeItemHandler = (id) => {};

  const defaultState = {
    items: [],
    totalAmount: 0,
  };

  const cartReducer = (prevState, action) => {
      if(action.type === "ADD ITEM")
      {
          const updatedItemsList = prevState.items.concat(action.item);
          const updatedTotalAmount = prevState.totalAmount + (action.item.quantity * action.item.price);
          return {items : updatedItemsList, totalAmount: updatedTotalAmount}
      }
      return defaultState;
  }

 const [cartState, cartDispatcher] = useReducer(cartReducer, defaultState)

 const addItemHandler = (item) => {
     cartDispatcher({type:"ADD ITEM" , item: item})
 }
  const contextValue = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemHandler,
      removeItem: removeItemHandler
  }

  return (
      <CartContext.Provider value={contextValue}>
          {props.children}
      </CartContext.Provider>
  )
};

export default CartContextProvider;
