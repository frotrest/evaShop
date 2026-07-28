import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchBlog = createAsyncThunk('blog/thunk', async (_, thunkAPI) => {
  try {
    const fetch = await axios.get('https://crisp-project-server.onrender.com/blog');

    return fetch.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.massage);
  }
});

export default fetchBlog;
