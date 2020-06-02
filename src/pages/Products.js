import React, { useContext } from "react";
import { ProductsContext } from "../context/products";
import Loading from "../components/Loading";
import ProductList from "../components/Products/ProductList";

export default function Products() {
  const { products, loading, featured } = useContext(ProductsContext);
  console.log(products);

  if (loading) {
    return <Loading />;
  }
  return <ProductList title="our products" products={products} />;
}
