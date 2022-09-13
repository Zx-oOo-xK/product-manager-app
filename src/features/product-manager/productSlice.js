import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  /**
   * deleteProduct is a method that delete product with id
   *
   * @param {props} props with the following properties:
   *  - id: the id of product to delete
   */

  await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
  });
});

export const getProducts = createAsyncThunk('products/getall', async (pagination) => {
  /**
   * getProducts is a method returns all products in pagination
   *
   * @param {props} props with the following properties:
   * - pagination: the pagination parameters for the product pages
   * @return {Promise} Promise resolved when all products
   */
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

  const response = await fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
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
