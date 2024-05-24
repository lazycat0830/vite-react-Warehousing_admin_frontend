const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SAVE_AllInventory":
      return { ...state, AllInventory: payload };
    case "SAVE_AllPurchase":
      return { ...state, AllPurchase: payload };
    default:
      return state;
  }
};
