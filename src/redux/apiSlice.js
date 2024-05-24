import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserInfo } from "./feature/auth/authSlice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL || "",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const userInfo = getUserInfo(getState());

    if (userInfo?.token) {
      headers.set("Authorization", `Bearer ${userInfo.token}`);
    }
    return headers;
  },
});

const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});

export default apiSlice;
