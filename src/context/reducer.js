export default (state, action) => {
  switch (action.type) {
    case "REMOVE":
      return [...state].filter((item) => item.id !== action.payload);
    case "INCREASE":
      return [...state].map((item) => {
        return item.id === action.payload
          ? { ...item, amount: item.amount + 1 }
          : item;
      });
    case "DECREASE":
      return [...state].map((item) => {
        if (item.id === action.payload && item.amount > 1) {
          item.amount--;
        }
        return item;
      });

    case "ADDTOCART":
      const { id, title, price, image } = action.payload;
      return [...state, { id, title, price, image, amount: 1 }];

    case "CLEARCART":
      return [];
    default:
      return state;
  }
};
