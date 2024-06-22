// Here we are making a get request with redux
import { IMAGEUPLOAD_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login : builder.mutation({
            query: (data) => ({
                url : `${USERS_URL}/login`,
                method: "POST",
                body: data
            }),
            // keepUnusedDataFor : 5
        }),
        logout : builder.mutation({
            query: () => ({
                url : `${USERS_URL}/logout`,
                method: "POST",
            }),
            // keepUnusedDataFor : 5
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data
            })
        }),
        profileImage: builder.mutation({
            query: (data) => ({
                url: `${IMAGEUPLOAD_URL}/profileImage`,
                method: "POST",
                body: data
            })
        }),
        profile: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL
            }),
            providesTags: ["Users"],
            keepUnusedDataFor: 5
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: "DELETE",
            }),
        }),
        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["User"]
        })
    }),
});


export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation, useProfileImageMutation } = usersApiSlice;
