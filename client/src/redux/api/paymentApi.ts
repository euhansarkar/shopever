import { tagTypes } from '../tag-types';
import { baseApi } from "./baseApi";

const BASE_PAYMENT_API_URL = "/payment";

export const paymentIntentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        // create  attribute group
        paymentIntent: build.mutation({
            query: (data) => ({
                url: `${BASE_PAYMENT_API_URL}/create-payment-intent`,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.payment],
        }),


    }),
});

export const { usePaymentIntentMutation } = paymentIntentApi;