import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
    body: JSON.stringify(data),
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
    body: JSON.stringify({ ...data, price: Number(data.price), quantity: Number(data.quantity) }),
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
 * getProducts is a method returns all products with query
 *
 * @param {object} queryProducts is object query data get products
 * @return {} list of products
 */
export const getProducts = createAsyncThunk('products/getall', async (queryProducts) => {
  const sort = queryProducts.sort.name
    ? `orderBy: {${queryProducts.sort.name}: "${queryProducts.sort.type}"},`
    : '';
  const pagination = `pagination: {page: ${queryProducts.page}, limit: ${queryProducts.limit}},`;
  const input = `input:{
    ${pagination} ${sort}
  }`;
  
  const query = `query {
    GetProducts(
        ${input}
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
  updateSuccess: undefined,
  errorMessage: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // getProducts
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.GetProducts.products;
        state.pagination = action.payload.GetProducts.pagination;
        state.loading = false;
        state.updateSuccess = false;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.products = [];
        state.errorMessage = '';
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.errorMessage = action.error.message || 'get product failed';
      })

      // getProduct
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.updateSuccess = false;
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.selectedProduct = {};
        state.errorMessage = '';
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'get product failed';
      })

      // createProduct
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
        state.updateSuccess = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'delete product failed';
        state.updateSuccess = false;
      })

      // updateProduct
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.updateSuccess = null;
        state.errorMessage = '';
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'update product failed';
        state.updateSuccess = false;
      })

      // deleteProduct
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'delete product failed';
        state.updateSuccess = false;
      });
  },
});

export default productSlice.reducer;
