import React, { useContext } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { CartContext } from "../../context/cart";
export default function CartItem({ id, image, title, price, amount }) {
  const { decreaseAmount } = useContext(CartContext);

  return (
    <article className="cart-item">
      <img src={image} alt={title} />
      <div className="">
        <h4>{title}</h4>
        <h5>£{price}</h5>
        <button
          type="button"
          className="cart-btn remove-btn"
          onClick={() => {
            console.log("removed item");
          }}
        >
          Remove
        </button>
      </div>
      <div className="">
        <button
          type="button"
          className="cart-btn amount-btn"
          onClick={() => console.log("amount increased")}
        >
          <FaAngleUp />
        </button>
        <p className="item-amount">{amount}</p>
        <button
          type="button"
          className="cart-btn amount-btn"
          onClick={decreaseAmount}
        >
          <FaAngleDown />
        </button>
      </div>
    </article>
  );
}
