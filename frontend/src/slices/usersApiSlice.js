import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getuserData: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/signin`,
                method: 'POST',
                body: data,
            }),
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            })
        }),
        logOutUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/update`,
                method: "PUT",
                body: data,
            })
        })
    })
})

export const { useGetuserDataMutation, useRegisterUserMutation, useLogOutUserMutation, useUpdateUserMutation } = usersApiSlice;