import { ICategory, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from '../tag-types';
import { crudTypes } from "../crud-types";

const BASE_CATEGORY_API_URL = "/categories";

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all categories
        categories: build.query({
            query: (arg?: Record<string, any>) => {
                return {
                    url: BASE_CATEGORY_API_URL,
                    method: crudTypes.GET,
                    params: arg,
                };
            },
            transformResponse: (response: ICategory[], meta: IMeta) => {
                return {
                    categories: response,
                    meta,
                };
            },
            providesTags: [tagTypes.category],
        }),
        // get single category
        category: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${BASE_CATEGORY_API_URL}/${id}`,
                method: crudTypes.GET,
            }),
            providesTags: [tagTypes.category],
        }),
        // create  category
        addCategory: build.mutation({
            query: (data) => ({
                url: BASE_CATEGORY_API_URL,
                method: crudTypes.POST,
                data,
                contentType: "multipart/form-data"
            }),
            invalidatesTags: [tagTypes.category],
        }),
        // update category
        updateCategory: build.mutation({
            query: (data) => ({
                url: `${BASE_CATEGORY_API_URL}/${data.id}`,
                method: crudTypes.PATCH,
                data: data.body,
            }),
            invalidatesTags: [tagTypes.category],
        }),
        // delete category
        deleteCategory: build.mutation({
            query: (id: string) => ({
                url: `${BASE_CATEGORY_API_URL}/${id}`,
                method: crudTypes.DELETE,
            }),
            invalidatesTags: [tagTypes.category],
        }),

    }),
});

export const {
    useCategoriesQuery, useCategoryQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation
} = categoryApi;