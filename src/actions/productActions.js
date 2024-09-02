import axios from 'axios';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_FAILURE,
  ADD_PRODUCT
} from './types';

export const fetchProducts = () => async dispatch => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const response = await axios.get('/api/products');
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchProductDetail = (id) => async dispatch => {
  dispatch({ type: FETCH_PRODUCT_DETAIL_REQUEST });
  try {
    const response = await axios.get(`/api/products/${id}`);
    dispatch({
      type: FETCH_PRODUCT_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_DETAIL_FAILURE,
      payload: error.message,
    });
  }
};

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});
