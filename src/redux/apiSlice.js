import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constant.js";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});

export default apiSlice;
