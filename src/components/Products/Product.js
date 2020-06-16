import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import img from "../../assets/mainBcg.jpeg";
export default function Product({ image, title, price, id }) {
  return (
    <article className="product">
      <div className="img-container">
        <img src={image || img} alt={title || "title missing"} />
        <Link to={`products/${id}`} className="btn btn-primary product-link">
          Details
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{title || "title missing"}</p>
        <p className="product-price">£{price || 0}</p>
      </div>
    </article>
  );
}
Product.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
