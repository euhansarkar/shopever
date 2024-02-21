import { baseApi } from "./baseApi";
import { tagTypes } from '../tag-types';

const BASE_ATTRIBUTE_OPTION_API_URL = "/attribute-options";

export const attributeOptionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        // update attribute group
        updateAttributeOption: build.mutation({
            query: (data) => ({
                url: `${BASE_ATTRIBUTE_OPTION_API_URL}/${data.id}`,
                method: "PUT",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.attributeOption],
        }),

    }),
});

export const { useUpdateAttributeOptionMutation, } = attributeOptionApi;