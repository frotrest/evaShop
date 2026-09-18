import { createSlice } from '@reduxjs/toolkit';
import fetchBlog from '../async/blogDataThunk';

const blogSlice = createSlice({
  name: 'blogSlice',
  initialState: {
    blogDataFetch: [],
    error: null,
    isLoading: false,
    filterBlogResult: [],
  },

  reducers: {
    filterInfo: (state, action) => {
      const filterData = state.blogDataFetch.filter((e) => e.type === action.payload);
      if (filterData.length) {
        state.filterBlogResult = state.blogDataFetch.filter((e) => e.type === action.payload);
      } else {
        state.filterBlogResult = state.blogDataFetch.filter((e) => e.type === 'dress');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogDataFetch = action.payload;
      })

      .addCase(fetchBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { filterInfo } = blogSlice.actions;
export default blogSlice.reducer;
