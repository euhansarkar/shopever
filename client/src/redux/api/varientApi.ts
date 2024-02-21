import { IMeta, IProduct, IVariant } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from '../tag-types';
import { crudTypes } from "../crud-types";

const BASE_VARIENT_API_URL = "/varients";

export const varientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all varients
        varients: build.query({
            query: (arg?: Record<string, any>) => {
                return {
                    url: BASE_VARIENT_API_URL,
                    method: crudTypes.GET,
                    params: arg,
                };
            },
            transformResponse: (response: IVariant[], meta: IMeta) => {
                return {
                    varients: response,
                    meta,
                };
            },
            providesTags: [tagTypes.varient],
        }),
        // get single varient
        varient: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${BASE_VARIENT_API_URL}/${id}`,
                method: crudTypes.GET,
            }),
            providesTags: [tagTypes.varient],
        }),
        // create  varient
        addVarient: build.mutation({
            query: (data) => ({
                url: BASE_VARIENT_API_URL,
                method: crudTypes.POST,
                data,
                contentType: "multipart/form-data"
            }),
            invalidatesTags: [tagTypes.varient],
        }),
        // update Varient
        updateVarient: build.mutation({
            query: (data) => ({
                url: `${BASE_VARIENT_API_URL}/${data.id}`,
                method: crudTypes.PATCH,
                data: data.body,
                contentType: "multipart/form-data"
            }),
            invalidatesTags: [tagTypes.varient],
        }),
        // delete Varient
        deleteVarient: build.mutation({
            query: (id: string) => ({
                url: `${BASE_VARIENT_API_URL}/${id}`,
                method: crudTypes.DELETE,
            }),
            invalidatesTags: [tagTypes.varient],
        }),

    }),
});

export const {
    useVarientQuery, useVarientsQuery, useAddVarientMutation, useUpdateVarientMutation, useDeleteVarientMutation
} = varientApi;