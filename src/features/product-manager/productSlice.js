import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

/**
 * deleteProduct is a method that delete product by id
 *
 * @param {string} id is the product id
 */
export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await fetch(`${apiUrl}/products/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
  });
});

/**
 * getProducts is a method returns all products in pagination
 *
 * @param {} pagination the pagination information
 * @return {} list of products and pagination
 */
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

  const response = await fetch(`${apiUrl}/graphql`, {
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
  pagination: {},
  loading: false,
  updateSuccess: null,
  errorMessage: '',
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
        state.updateSuccess = true;
        state.errorMessage = '';
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.products = [];
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.updateSuccess = true;
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'delete product failed';
      })
      .addMatcher(isPending(getProducts, deleteProduct), (state) => {
        state.loading = true;
        state.errorMessage = '';
        state.updateSuccess = null;
      });
  },
});

export default productSlice.reducer;
