import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://crisp-project-server.onrender.com/products');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,

    filters: {
      brands: [],
      types: [],
      sizes: [],
      price: [],
    },
    sortBy: 'desc',
    itemsToShow: '10',
  },

  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setItemsToShow: (state, action) => {
      state.itemsToShow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFilters, setSortBy, setItemsToShow } = productSlice.actions;
export default productSlice.reducer;
