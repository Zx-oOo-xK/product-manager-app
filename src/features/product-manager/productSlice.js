import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

/**
 * createProduct is a method that create product
 * 
 * @param {Object} - data with following properties:
 * - title: name of product
 * - description: information of product
 * - price: price of product
 * - quantity: qunatity of product
 * - is_active: products still available
 */
export const createProduct = createAsyncThunk('products/create', async (data) => {
  await fetch(`${apiUrl}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(data)
  });
});

/**
 * updateProduct is a method that create product
 * 
 * @param {number} - id of product 
 * @param {Object} - data with following properties:
 * - title: name of product
 * - description: information of product
 * - price: price of product
 * - quantity: qunatity of product
 * - is_active: products still available
 */
export const updateProduct = createAsyncThunk('products/update', async ({ id, data }) => {
  await fetch(`${apiUrl}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(data)
  });
});

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
 * getProduct is a method that delete product by id
 *
 * @param {string} id is the product id
 */
export const getProduct = createAsyncThunk('products/get', async (id) => {
  const response = await fetch(`${apiUrl}/products/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
  });

  const value = await response.json();
  return value;
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
  selectedProduct: {},
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
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'delete product failed';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.GetProducts.products;
        state.pagination = action.payload.GetProducts.pagination;
        state.loading = false;
        state.updateSuccess = true;
        state.errorMessage = '';
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.errorMessage = action.error.message || 'get product failed';
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload
        state.loading = false;
        state.updateSuccess = true;
        state.errorMessage = '';
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'get product failed';
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'update product failed';
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'delete product failed';
      })
      .addMatcher(isFulfilled(updateProduct, deleteProduct, createProduct), (state) => {
        state.updateSuccess = true;
        state.loading = false
      })
      .addMatcher(isRejected(createProduct, getProducts, deleteProduct, updateProduct, getProduct), (state) => {
        state.loading = false
        state.updateSuccess = null;
      })
      .addMatcher(isPending(createProduct, getProducts, deleteProduct, updateProduct, getProduct), (state) => {
        state.loading = true;
        state.errorMessage = '';
        state.updateSuccess = null;
      });
  },
});

export default productSlice.reducer;
