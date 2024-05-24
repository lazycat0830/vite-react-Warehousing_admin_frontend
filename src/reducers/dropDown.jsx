const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SAVE_dropDownCompany":
      return { ...state, Company: payload };
    case "SAVE_dropDownProductType":
      return { ...state, ProductType: payload };
    default:
      return state;
  }
};
