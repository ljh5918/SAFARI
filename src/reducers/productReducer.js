const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, items: action.payload };
    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "ADD_PRODUCT":
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};

export default productsReducer;
