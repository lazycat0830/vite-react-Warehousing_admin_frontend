const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SAVE_AllPayType":
      return { ...state, AllPayType: payload };
    default:
      return state;
  }
};
