import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../slice/product.slice";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch;