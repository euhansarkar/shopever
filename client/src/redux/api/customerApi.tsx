import { IMeta, ICustomer } from "@/types";
import { crudTypes } from "../crud-types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BASE_CUSTOMER_API_URL = "/customers";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all customers
    customers: build.query({
      query: (arg?: Record<string, any>) => {
        return {
          url: BASE_CUSTOMER_API_URL,
          method: crudTypes.GET,
          params: arg,
        };
      },
      transformResponse: (response: ICustomer[], meta: IMeta) => {
        return {
          customers: response,
          meta,
        };
      },
      providesTags: [tagTypes.customer],
    }),
    // get single customer
    customer: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BASE_CUSTOMER_API_URL}/${id}`,
        method: crudTypes.GET,
      }),
      providesTags: [tagTypes.customer],
    }),
    // create  customer
    addCustomer: build.mutation({
      query: (data) => ({
        url: `/users/create-customer`,
        method: crudTypes.POST,
        data,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    // update customer
    updateCustomer: build.mutation({
      query: (data) => ({
        url: `${BASE_CUSTOMER_API_URL}/${data.id}`,
        method: crudTypes.PATCH,
        data: data.body,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    // delete customer
    deleteCustomer: build.mutation({
      query: (id: string) => ({
        url: `${BASE_CUSTOMER_API_URL}/${id}`,
        method: crudTypes.DELETE,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
  }),
});

export const {
  useCustomerQuery,
  useCustomersQuery,
  useAddCustomerMutation,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} = customerApi;
