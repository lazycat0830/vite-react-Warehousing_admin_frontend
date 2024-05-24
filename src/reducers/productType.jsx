const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SAVE_AllProductType":
      return { ...state, AllProductType: payload };
    default:
      return state;
  }
};
