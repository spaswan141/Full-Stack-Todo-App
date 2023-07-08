// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userAuthAPi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shubhampaswantodoapp.onrender.com/",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "user/login",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "user/signup",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (user) => {
        return {
          url: "user/sentLink",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getLoggedUser: builder.query({
      query: (token) => ({
        url: "user",
        method: "GET",
        headers: {
          authorization: token,
        },
      }),
    }),
    addTodo: builder.mutation({
      query: (user, token) => {
        return {
          url: "todo/create-todo",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
            authorization: token,
          },
        };
      },
    }),
    getTodo: builder.query({
      query: (token) => ({
        url: "todo/todos",
        method: "GET",
        headers: {
          authorization: token,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useGetLoggedUserQuery,
  useAddTodoMutation,
  useGetTodoQuery,
} = userAuthAPi;
