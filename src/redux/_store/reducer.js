import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, UPDATE_QUANTITY } from "./constant";
const initialState = {
    cart: []
};

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const product = { ...action.payload, qty: 1 };
            return {
                ...state,
                cart: [...state.cart, product]
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id),
            };
        case CLEAR_CART:
            return {
                ...state,
                cart: [] // Reset cart to an empty array
            };
        case UPDATE_QUANTITY:
            const { productId, quantity } = action.payload;
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === productId ? { ...item, qty: quantity } : item
                ),
            };
        default:
            return state;
    }
};

export default storeReducer;
