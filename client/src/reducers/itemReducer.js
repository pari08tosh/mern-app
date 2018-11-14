import { GET_ITEMS, ADD_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    loading: false,
    error: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };
        case ADD_ITEM:
            state.items.unshift(action.payload);
            return {
                items: state.items
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}