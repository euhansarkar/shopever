import { baseApi } from "./api/baseApi";
import selectReducer from './features/varientOption/selectSlice';
import cartReducer from './features/cart/cartSlice';
import checkoutReducer from './features/checkout/checkoutSlice';
import paymentReducer from './features/payment/paymentSlice';

export const reducer = {
    cart: cartReducer,
    select: selectReducer,
    payment: paymentReducer,
    checkout: checkoutReducer,
    [baseApi.reducerPath]: baseApi.reducer
}

