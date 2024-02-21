import { IShippingMethod, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from '../tag-types';

const BASE_SHIPPING_METHOD_API_URL = "/shipping-methods";

export const shippingMethodApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all shipping Methods
        shippingMethods: build.query({
            query: (arg?: Record<string, any>) => {
                return {
                    url: BASE_SHIPPING_METHOD_API_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: IShippingMethod[], meta: IMeta) => {
                return {
                    shippingMethods: response,
                    meta,
                };
            },
            providesTags: [tagTypes.shippingMethod],
        }),
        // get single shipping method
        shippingMethod: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${BASE_SHIPPING_METHOD_API_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.shippingMethod],
        }),
        // create  shipping method
        addShippingMethod: build.mutation({
            query: (data) => ({
                url: BASE_SHIPPING_METHOD_API_URL,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.shippingMethod],
        }),
        // update shipping method
        updateShippingMethod: build.mutation({
            query: (data) => ({
                url: `${BASE_SHIPPING_METHOD_API_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.shippingMethod],
        }),
        // delete shipping method 
        deleteShippingMethod: build.mutation({
            query: (id: string) => ({
                url: `${BASE_SHIPPING_METHOD_API_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.shippingMethod],
        }),

    }),
});

export const { useShippingMethodQuery, useShippingMethodsQuery, useAddShippingMethodMutation, useDeleteShippingMethodMutation, useUpdateShippingMethodMutation } = shippingMethodApi;