import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import EmptyCart from "../components/Cart/EmptyCart";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  let { user } = useContext(UserContext);
  const { cart, total, clearCart } = useContext(CartContext);

  if (cart.length === 0) {
    return <EmptyCart />;
  }
  return (
    <section className="cart-items section">
      <h2>Your Cart</h2>
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <h2>total: £{total}</h2>
      {console.log(user)}
      {user.token ? (
        <Link to="/checkout" className="btn btn-primary btn-block">
          checkout
        </Link>
      ) : (
        <Link to="/login" className="btn btn-primary btn-block">
          login
        </Link>
      )}
      <br />
      <button
        className="btn btn-primary btn-block"
        onClick={() => {
          clearCart();
        }}
      >
        Clear cart
      </button>
    </section>
  );
}
