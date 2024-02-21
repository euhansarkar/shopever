import { IMeta, IOrder } from "@/types";
import { crudTypes } from "../crud-types";
import { tagTypes } from '../tag-types';
import { baseApi } from "./baseApi";

const BASE_ORDER_API_URL = "/orders";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all orders
        orders: build.query({
            query: (arg?: Record<string, any>) => {
                return {
                    url: BASE_ORDER_API_URL,
                    method: crudTypes.GET,
                    params: arg,
                };
            },
            transformResponse: (response: IOrder[], meta: IMeta) => {
                return {
                    orders: response,
                    meta,
                };
            },
            providesTags: [tagTypes.order],
        }),
        // get single order
        order: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${BASE_ORDER_API_URL}/${id}`,
                method: crudTypes.GET,
            }),
            providesTags: [tagTypes.order],
        }),
        // create  order
        addOrder: build.mutation({
            query: (data) => ({
                url: BASE_ORDER_API_URL,
                method: crudTypes.POST,
                data,
            }),
            invalidatesTags: [tagTypes.order],
        }),
        // update order
        updateOrder: build.mutation({
            query: (data) => ({
                url: `${BASE_ORDER_API_URL}/${data.id}`,
                method: crudTypes.PATCH,
                data: data.body,
            }),
            invalidatesTags: [tagTypes.order],
        }),
        // delete order
        deleteOrder: build.mutation({
            query: (id: string) => ({
                url: `${BASE_ORDER_API_URL}/${id}`,
                method: crudTypes.DELETE,
            }),
            invalidatesTags: [tagTypes.order],
        }),

    }),
});

export const { useOrderQuery, useOrdersQuery, useAddOrderMutation, useDeleteOrderMutation, useUpdateOrderMutation } = orderApi;