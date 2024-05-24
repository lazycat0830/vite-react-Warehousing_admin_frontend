const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SAVE_AllOrder":
      return { ...state, AllOrder: payload };
    default:
      return state;
  }
};
