import React, { createContext, useState, useEffect } from "react";
import localCart from "../utils/localCart";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(localCart);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    console.log("cart changed");
    let newCartItems = cart.reduce((total, cartItem) => {
      return total + cartItem.amount;
    }, 0);
    setCartItems(newCartItems);
    let newTotal = cart.reduce((total, cartItem) => {
      const { amount, price } = cartItem;
      return total + amount * price;
    }, 0);

    newTotal = Number(newTotal.toFixed(2));

    setTotal(newTotal);
  }, [cart]);
  const removeItem = (id) => {};
  const increaseAmount = (id) => {};
  const decreaseAmount = (id) => {
    console.log("decreased");
  };
  const addToCart = (product) => {};
  const clearCart = () => {};
  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export { CartContext, CartProvider };
