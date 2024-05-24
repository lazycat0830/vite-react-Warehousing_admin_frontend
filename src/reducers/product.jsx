const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SAVE_AllProduct":
      return { ...state, AllProduct: payload };
    default:
      return state;
  }
};
