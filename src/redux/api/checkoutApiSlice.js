import apiSlice from "../apiSlice.js";
import { ORDER_URL } from "../constant.js";

const checkoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrderFromCart: builder.mutation({
      query: (shippingAddress) => ({
        url: `${ORDER_URL}/from-cart`,
        method: "POST",
        body: { shippingAddress },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useCreateOrderFromCartMutation } = checkoutApiSlice;
