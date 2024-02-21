import { IAttributeGroup, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from '../tag-types';

const BASE_ATTRIBUTE_GROUP_API_URL = "/attribute-groups";

export const attributeGroupApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all attribute groups
        attributeGroups: build.query({
            query: (arg?: Record<string, any>) => {
                return {
                    url: BASE_ATTRIBUTE_GROUP_API_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: IAttributeGroup[], meta: IMeta) => {
                return {
                    attributeGroups: response,
                    meta,
                };
            },
            providesTags: [tagTypes.attributeGroup],
        }),
        // get single attribute group
        attributeGroup: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${BASE_ATTRIBUTE_GROUP_API_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.attributeGroup],
        }),
        // create  attribute group
        addAttributeGroup: build.mutation({
            query: (data) => ({
                url: BASE_ATTRIBUTE_GROUP_API_URL,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.attributeGroup],
        }),
        // update attribute group
        updateAttributeGroup: build.mutation({
            query: (data) => ({
                url: `${BASE_ATTRIBUTE_GROUP_API_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.attributeGroup],
        }),
        // delete attribute group
        deleteAttributeGroup: build.mutation({
            query: (id) => ({
                url: `${BASE_ATTRIBUTE_GROUP_API_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.attributeGroup],
        }),

    }),
});

export const { useAddAttributeGroupMutation, useAttributeGroupQuery, useAttributeGroupsQuery, useDeleteAttributeGroupMutation, useUpdateAttributeGroupMutation } = attributeGroupApi;