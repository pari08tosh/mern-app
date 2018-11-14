import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, ITEMS_LOADING, ITEMS_ERROR } from '../actions/types';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  return axios.get('/items')
    .then((res) => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data.data
      });
      return null;
    })
    .catch(err => {
      dispatch({
        type: ITEMS_ERROR,
      });
      return handleError(err);
    });
};

export const addItem = (item) => dispatch => {

  const token = JSON.parse(localStorage.getItem('user')).token;

  return axios.post('/items/insertItem', item, {headers: { 'Authorization' : token }})
    .then(res => {
      dispatch({
        type: ADD_ITEM,
        payload: item
      });
    })
    .catch(err => {
      dispatch({
        type: ITEMS_ERROR,
      });
      return handleError(err);
    });
};

function handleError(err) {
  return err.response.data.message || `Error Fetching Data. Check your network connection.`;
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};