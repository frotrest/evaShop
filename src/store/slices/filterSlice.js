import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters-slice',
  initialState: {
    filters: [],
  },
  reducers: {
    toggleFilter: (state, action) => {
      const category = action.payload;
      const index = state.filters.indexOf(category);

      if (index === -1) {
        state.filters.push(category);
      } else {
        state.filters.splice(index, 1);
      }
    },
  },
});

export const { toggleFilter } = filterSlice.actions;

export default filterSlice.reducer;
