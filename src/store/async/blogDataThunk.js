import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchBlog = createAsyncThunk('blog/thunk', async (_, thunkAPI) => {
  try {
    const response = await axios.get('https://crisp-project-server.onrender.com/blog');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export default fetchBlog;
