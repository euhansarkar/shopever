import { IMeta, IProduct } from "@/types";
import { crudTypes } from "../crud-types";
import { tagTypes } from '../tag-types';
import { baseApi } from "./baseApi";

const BASE_PRODUCT_API_URL = "/products";

export const productApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all products
        products: build.query({
            query: (arg?: Record<string, any>) => {
                return {
                    url: BASE_PRODUCT_API_URL,
                    method: crudTypes.GET,
                    params: arg,
                };
            },
            transformResponse: (response: IProduct[], meta: IMeta) => {
                return {
                    products: response,
                    meta,
                };
            },
            providesTags: [tagTypes.product],
        }),
        // get single product
        product: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${BASE_PRODUCT_API_URL}/${id}`,
                method: crudTypes.GET,
            }),
            providesTags: [tagTypes.product],
        }),
        // create  product
        addProduct: build.mutation({
            query: (data) => ({
                url: BASE_PRODUCT_API_URL,
                method: crudTypes.POST,
                data,
            }),
            invalidatesTags: [tagTypes.product],
        }),
        // update product
        updateProduct: build.mutation({
            query: (data) => ({
                url: `${BASE_PRODUCT_API_URL}/${data.id}`,
                method: crudTypes.PATCH,
                data: data.body,
            }),
            invalidatesTags: [tagTypes.product],
        }),
        // delete product
        deleteProduct: build.mutation({
            query: (id: string) => ({
                url: `${BASE_PRODUCT_API_URL}/${id}`,
                method: crudTypes.DELETE,
            }),
            invalidatesTags: [tagTypes.product],
        }),

    }),
});

export const { useProductQuery, useProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi;