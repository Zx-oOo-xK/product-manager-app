import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await fetch(`http://localhost:5000/api/v1/products/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
  });
});

export const getProducts = createAsyncThunk('products/getall', async (pagination) => {
  const query = `query {
    GetProducts(
        input:{pagination: {page: ${pagination.page}, limit: ${pagination.limit}}}
    ){
        pagination {
            currentPage
            limit
            totalCount
        }
        products {
            id
            title
            description
            price
            quantity
            isActive
            userID
        }
    }
}`;

  const response = await fetch('http://localhost:5000/api/v1/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
    }),
    mode: 'cors',
  });

  const value = await response.json();
  return value.data;
});

const initialState = {
  products: [],
  dispatchProduct: false,
  pagination: {},
  loading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.GetProducts.products;
        state.pagination = action.payload.GetProducts.pagination;
        state.loading = false;
        state.dispatchProduct = false;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.products = [];
      })

      .addCase(deleteProduct.fulfilled, (state) => {
        state.dispatchProduct = true;
      })
      .addCase(deleteProduct.pending, () => {});
  },
});

export default productSlice.reducer;
