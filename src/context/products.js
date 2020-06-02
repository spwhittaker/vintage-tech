import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts } from "../utils/helpers";
export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then((response) => {
      const featuredItems = featuredProducts(response.data);
      setFeatured(featuredItems);
      setProducts(response.data);
      setLoading(false);
    });
    return () => {};
  }, []);

  return (
    <ProductsContext.Provider value={{ loading, products, featured }}>
      {children}
    </ProductsContext.Provider>
  );
}
