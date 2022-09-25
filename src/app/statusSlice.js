import { createSlice } from '@reduxjs/toolkit';

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    showSidebar: false,
    sortInfo: { name: '', type: 'asc' },
  },
  reducers: {
    toggle(state) {
      state.showSidebar = !state.showSidebar;
    },
    changeSortTable(state, action) {
      state.sortInfo = action.payload;
    },
  },
});

export const { toggle, changeSortTable } = statusSlice.actions;

export default statusSlice.reducer;
