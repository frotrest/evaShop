import { createSlice } from '@reduxjs/toolkit';
import { fetchOtherProducts } from '../async/otherProductsFetch';

const otherProductsSlice = createSlice({
  name: 'other-products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOtherProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOtherProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default otherProductsSlice.reducer;
