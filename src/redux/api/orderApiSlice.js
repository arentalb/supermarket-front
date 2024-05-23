// src/redux/api/orderApiSlice.js

import apiSlice from "../apiSlice.js";
import { ORDER_URL } from "../constant.js";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //admin section
    getOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/all`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getOrderDetail: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `${ORDER_URL}/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Order"],
    }),
    //user section
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/myorders`,
        method: "GET",
      }),
      providesTags: ["UserOrder"],
    }),
    getUserOrderDetail: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/myorder/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "UserOrder", id }],
    }),
    createUserOrder: builder.mutation({
      query: (shippingAddress) => ({
        url: `${ORDER_URL}/myorders/new`,
        method: "POST",
        body: { shippingAddress },
      }),
      invalidatesTags: ["Cart", "Order", "UserOrder"],
    }),
  }),
});

export const {
  //admin
  useGetOrdersQuery,
  useGetOrderDetailQuery,
  useUpdateOrderStatusMutation,
  //user
  useCreateUserOrderMutation,
  useGetUserOrdersQuery,
  useGetUserOrderDetailQuery,
} = orderApiSlice;
