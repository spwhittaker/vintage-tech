import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import CartLink from "../components/Cart/CartLink";
import { UserContext } from "../context/user";
import LoginLink from "./LoginLink";
export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="header">
      <img src={logo} alt="vintage tech logo" className="logo" />
      <nav>
        <ul>
          <div className="">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            {user.token && (
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
            )}
          </div>
          <div>
            <li>
              <LoginLink />
            </li>
            <li>
              <CartLink />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
