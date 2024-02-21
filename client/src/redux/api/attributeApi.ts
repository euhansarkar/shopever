import { IAttribute, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from '../tag-types';

const BASE_ATTRIBUTE_API_URL = "/attributes";

export const attributeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all attributes
        attributes: build.query({
            query: (arg?: Record<string, any>) => {
                return {
                    url: BASE_ATTRIBUTE_API_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: IAttribute[], meta: IMeta) => {
                return {
                    attributes: response,
                    meta,
                };
            },
            providesTags: [tagTypes.attribute],
        }),
        // get single attributes
        attribute: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${BASE_ATTRIBUTE_API_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.attribute],
        }),
        // create  attribute group
        addAttribute: build.mutation({
            query: (data) => ({
                url: BASE_ATTRIBUTE_API_URL,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.attribute],
        }),
        // update attribute group
        updateAttribute: build.mutation({
            query: (data) => ({
                url: `${BASE_ATTRIBUTE_API_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.attribute],
        }),
        // delete attribute group
        deleteAttribute: build.mutation({
            query: (id: string) => ({
                url: `${BASE_ATTRIBUTE_API_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.attribute],
        }),

    }),
});

export const { useAttributeQuery, useAttributesQuery, useAddAttributeMutation, useUpdateAttributeMutation, useDeleteAttributeMutation } = attributeApi;