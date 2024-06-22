// Here we are making a get request with redux
import { IMAGEUPLOAD_URL, PRODUCTs_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts : builder.query({
            query: ({keyword, pageNumber}) => ({
                url : PRODUCTs_URL,
                params: {
                    keyword,
                    pageNumber
                }
            }),
            providesTags:['Products'],
            keepUnusedDataFor : 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url:PRODUCTs_URL,
                method: "POST",
            }),
            invalidatesTags: ['Product'],
        }),
        
        updateProduct: builder.mutation({
            query:(data) => ({
                url:`${PRODUCTs_URL}/${data.productId}`,
                method: "PUT",
                body: data
            }),
            // clear the cache
            invalidatesTags: ["Products"],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${IMAGEUPLOAD_URL}`,
                method: "POST",
                body: data
            })
        }),
        getTopMaterials: builder.query({
            query: () => ({
                url:`${PRODUCTs_URL}/top`
            }),
            keepUnusedDataFor: 5
        })
    }),
});

export const {useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useGetTopMaterialsQuery } = productsApiSlice;
