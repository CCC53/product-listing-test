// redux/yourSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../helpers/products';
import { AddToCartActionPayload, InitialState, SortActionPayload } from '../types/product';

const initialState: InitialState = {
  products: [],
  totalProducts: [],
  cartProducts: [],
  total: 0,
  loading: false
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByTitle: (state, action) => {
      const regex = new RegExp(action.payload);
      state.products = state.products.filter(item => regex.test(item.tittle));
    },
    sortByKeyAndOrder: (state, action: PayloadAction<SortActionPayload>) => {
      if (action.payload.key === 'price') {
        state.products = action.payload.order === 'asc' ? state.products.sort((a, b) => a.price - b.price) : state.products.sort((a, b) => b.price - a.price);
      } else {
        state.products = action.payload.order === 'asc' ? state.products.sort((a, b) => a.rating - b.rating) : state.products.sort((a, b) => b.rating - a.rating);
      }
    },
    loadMoreProducts: (state) => {
      let i = 2;
      state.products = state.totalProducts.slice(0, state.products.length*i);
      i++;
    },
    addToCart(state, action: PayloadAction<AddToCartActionPayload>) {
      state.cartProducts.push(action.payload.product);
    },
    getTotal(state) {
      state.total = Number(state.cartProducts.reduce((total, product) => total + product.price, 0).toFixed(2));
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProducts = action.payload;
        state.products = action.payload.slice(0, 10);
    });
  }
});

export const { filterByTitle, sortByKeyAndOrder, loadMoreProducts, addToCart, getTotal } = productSlice.actions;
