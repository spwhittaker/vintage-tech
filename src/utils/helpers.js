// helper functions
export function featuredProducts(data) {
  return data.filter((product) => {
    return product.featured === true;
  });
}
