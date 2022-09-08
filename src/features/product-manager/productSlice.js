import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk('products/getall', async () => {
  const response = await fetch('http://localhost:5000/api/v1/products', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
  });
  return response.data;
});

const initialState = {
  products: [],
  loading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProducts.fulfilled, (state) => {
      state.products = state;
    });
  },
});

export default productSlice.reducer;
