import { IPaymentMethod, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from '../tag-types';

const BASE_PAYMENT_METHOD_API_URL = "/payment-methods";

export const paymentMethodApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all payment Methods
        paymentMethods: build.query({
            query: (arg?: Record<string, any>) => {
                return {
                    url: BASE_PAYMENT_METHOD_API_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: IPaymentMethod[], meta: IMeta) => {
                return {
                    paymentMethods: response,
                    meta,
                };
            },
            providesTags: [tagTypes.paymentMethod],
        }),
        // get single payment method
        paymentMethod: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${BASE_PAYMENT_METHOD_API_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.paymentMethod],
        }),
        // create  payment method
        addPaymentMethod: build.mutation({
            query: (data) => ({
                url: BASE_PAYMENT_METHOD_API_URL,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.paymentMethod],
        }),
        // update payment method
        updatePaymentMethod: build.mutation({
            query: (data) => ({
                url: `${BASE_PAYMENT_METHOD_API_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.paymentMethod],
        }),
        // delete payment method 
        deletePaymentMethod: build.mutation({
            query: (id: string) => ({
                url: `${BASE_PAYMENT_METHOD_API_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.paymentMethod],
        }),

    }),
});

export const { usePaymentMethodQuery, usePaymentMethodsQuery, useAddPaymentMethodMutation, useDeletePaymentMethodMutation, useUpdatePaymentMethodMutation } = paymentMethodApi;