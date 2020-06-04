import url from "./URL";
export function flattenProducts(data) {
  return data.map((item) => {
    //cloudinary
    let image = item.image.url;
    //local
    //let image = `${url}${item.image.url}`;
    return { ...item, image };
  });
}

// helper functions
export function featuredProducts(data) {
  return data.filter((product) => {
    return product.featured === true;
  });
}
// local image fix
