// Here we are making a get request with redux
import { PRODUCTs_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct : builder.query({
            query: (id) => ({
                url : `${PRODUCTs_URL}/${id}`,
            }),
            keepUnusedDataFor : 5
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTs_URL}/${data.productId}/reviews`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Product"]
        }),
        createQuestion: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTs_URL}/${data.productId}/questions`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Product"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url:`${PRODUCTs_URL}/${id}`,
                method: "DELETE"
            })
        })
    }),
});


export const {useGetProductQuery, useDeleteProductMutation, useCreateReviewMutation, useCreateQuestionMutation, useGetPaidProductQuery} = productApiSlice;
