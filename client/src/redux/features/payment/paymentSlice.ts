import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
    clientSecret: string;
    stripeCardError: string;
} 

const initialState: PaymentState = {
    clientSecret: "",
    stripeCardError: "",
};

export const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setClientSecret: (state, action: PayloadAction<string>) => {
            state.clientSecret = action.payload;
        },
        setStripeCardError: (state, action: PayloadAction<string>) => {
            state.stripeCardError = action.payload;
        },
    },
});

export const { setClientSecret, setStripeCardError } = paymentSlice.actions;

export default paymentSlice.reducer;
