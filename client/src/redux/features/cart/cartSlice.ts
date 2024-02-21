import { ICartProduct } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface ICart {
    products: ICartProduct[];
    total: number;
}

const getCartFromCookies = (): ICart => {
    const cartString = Cookies.get('cartProducts');
    return cartString ? JSON.parse(cartString) : { products: [], total: 0 };
};

const saveCartToCookies = (cart: ICart) => {
    Cookies.set('cartProducts', JSON.stringify(cart), { expires: 7 }); // Set cookie expiration (in days)
};

const initialState: ICart = getCartFromCookies();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartProduct>) => {
            const isExist = state.products.find(product => product.id === action.payload.id);
            if (isExist) {
                isExist.quantity! += 1;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }

            state.total += action.payload.price;
            saveCartToCookies(state);
        },

        removeFromCart: (state, action: PayloadAction<ICartProduct>) => {
            state.products = state.products.filter(product => product.id !== action.payload.id);
            state.total -= action.payload.price * action.payload.quantity!;
            saveCartToCookies(state);
        },

        removeOne: (state, action: PayloadAction<ICartProduct>) => {
            const isExist = state.products.find(product => product.id === action.payload.id);
            if (isExist && isExist.quantity! > 1) {
                isExist.quantity! -= 1;
            } else {
                state.products = state.products.filter(product => product.id !== action.payload.id);
            }
            state.total -= action.payload.price;
            saveCartToCookies(state);
        },

        resetCart: (state) => {
            state.products = [];
            state.total = 0;
            saveCartToCookies(state);
        },
    },
});

export const { addToCart, removeFromCart, removeOne, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
