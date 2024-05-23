import apiSlice from "../apiSlice.js";
import { ORDER_URL } from "../constant.js";

const checkoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrderFromCart: builder.mutation({
      query: (shippingAddress) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: { shippingAddress },
      }),
      invalidatesTags: ["Cart"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `${ORDER_URL}/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderFromCartMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} = checkoutApiSlice;
