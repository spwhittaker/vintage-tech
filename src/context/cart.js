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

    newTotal = newTotal.toFixed(2);

    setTotal(newTotal);
  }, [cart]);
  const removeItem = (id) => {
    setCart([...cart].filter((item) => item.id !== id));
  };
  const increaseAmount = (id) => {
    setCart(
      [...cart].map((item) => {
        if (item.id === id) {
          item.amount++;
        }
        return item;
      })
    );
  };
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      return removeItem(id);
    } else {
      setCart(
        [...cart].map((item) => {
          if (item.id === id && item.amount > 1) {
            item.amount--;
          }

          return item;
        })
      );
    }
  };
  const addToCart = (product) => {
    console.log(product);
  };
  const clearCart = () => {
    setCart([]);
  };
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
