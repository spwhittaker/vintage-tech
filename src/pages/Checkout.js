import React, { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";
import submitOrder from "../strapi/submitOrder";
//react-stripe-elements
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from "react-stripe-elements";
function Checkout(props) {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = useContext(UserContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const isEmpty = !name || alert.show;
  async function handleSubmit(e) {
    showAlert({ msg: "submitting order... please wait", timeout: false });
    e.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch((err) => console.log(err));
    const { token } = response;
    if (token) {
      setError("");
      const { id } = token;
      let order = await submitOrder({
        name: name,
        total: total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      });
      if (order) {
        showAlert({ msg: "Your order is complete!" });
        clearCart();
        history.push("/");
        return;
      } else {
        showAlert({
          msg: "there was an error with your order. Please try again.",
          type: "danger",
          timeout: false,
        });
      }
    } else {
      hideAlert();
      setError(response.error.message);
    }
  }
  if (cart.length < 1) {
    return <EmptyCart />;
  }
  return (
    <section className="section form">
      <h2 className="section-title">checkout</h2>
      <form className="checkout-form">
        <h3>
          order total: <span>£{total}</span>
        </h3>
        <div className="form-control">
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="stripe-input">
          <label htmlFor="card-element">
            Credit or Debit card
            <p className="stripe-info">
              Test using this credit card: <span>4000 0082 6000 0000</span>
              <br />
              Enter any 5 digits for zip code
              <br />
              enter any 3 digits for CVC
            </p>
          </label>
        </div>
        <CardElement className="card-element"></CardElement>
        {error && <p className="form-empty">{error}</p>}
        {isEmpty ? (
          <p className="form-empty">Please fill out name field</p>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-block"
          >
            Submit
          </button>
        )}
      </form>
    </section>
  );
}
const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_51GqfPBFamQNYKTYPFnL49L4AAIXjnWzPTb5pRy0DhZqaH6ak0Bdg2dLrG97HT40K5zDzRbGIBO4svaSQV7QQVzJY00OosG6aIi">
      <Elements>
        <CardForm />
      </Elements>
    </StripeProvider>
  );
};

export default StripeWrapper;
