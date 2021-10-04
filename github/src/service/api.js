import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


 export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getusers: builder.query({
      query: () => {
        return {
          url: "users",
          method: "GET",
        };
      },
    }),
  }),
});
export const { useGetusersQuery } = usersApi;
