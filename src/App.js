import React, {useState } from 'react'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartContextProvider from './context/CartContextProvider'
function App() {
  const [isCartRendered, setIsCartRendered] = useState(false);
  
  const showCartHandler = () => {
    setIsCartRendered(true);
  }

  const hideCartHandler = () => {
    setIsCartRendered(false)
  }
  
  return (
    <CartContextProvider>
           {isCartRendered && <Cart onClose = {hideCartHandler}/>}
           <Header onShowCart = {showCartHandler}/>
           <Meals/>
    </CartContextProvider>
  );
}

export default App;
