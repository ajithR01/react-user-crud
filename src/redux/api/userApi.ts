import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils/apiConfig";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<
      { data: { id: number; first_name: string; last_name: string; email: string; avatar: string }[]; total_pages: number },
      { page: number }
      >({
      query: ({ page }) => `/users?page=${page}&per_page=5`,
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `users/${id}`,
        method: "PUT",  // Use "PATCH" if only updating specific fields
        body: userData,
      }),
    }),
    deleteUser: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),    
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi;
