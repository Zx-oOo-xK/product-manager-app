import { createSlice } from '@reduxjs/toolkit';

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    showSidebar: false,
  },
  reducers: {
    toggle(state) {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const { toggle } = statusSlice.actions;

export default statusSlice.reducer;
