import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../utils/apiConfig";
import { Login } from "../../types/login";

interface AuthResponse {
  token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation<AuthResponse, Login>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
