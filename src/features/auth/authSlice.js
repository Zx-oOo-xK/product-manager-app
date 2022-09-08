import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StorageAPI from 'common/storageAPI';

const API_URL = process.env.REACT_APP_API_URL;
const AUTH_TOKEN_KEY = 'authToken';

const initialState = {
  loading: false,
  loginSuccess: null,
  errorMessage: null,
};

// Actions

const authenticate = createAsyncThunk('auth/authenticate', async ({ username, password }) =>
  fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
);

export const signin =
  ({ username, password, rememberMe }) =>
  async (dispatch) => {
    const response = await dispatch(authenticate({ username, password }));
    const { token } = await response.json();
    if (rememberMe) {
      StorageAPI.local.set(AUTH_TOKEN_KEY, token);
    } else {
      StorageAPI.session.set(AUTH_TOKEN_KEY, token);
    }
    return token;
  };

// Authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(authenticate.fulfilled, (state) => {
        state.loading = false;
        state.loginSuccess = true;
        state.errorMessage = null;
      })
      .addCase(authenticate.pending, (state) => {
        state.loading = true;
        state.loginSuccess = null;
        state.errorMessage = null;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.loading = false;
        state.loginSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export default authSlice.reducer;
