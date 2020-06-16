//import url from "./URL";
export function flattenProducts(data) {
  return data.map((item) => {
    //cloudinary
    let image = (item.image && item.image.url) || null;

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
