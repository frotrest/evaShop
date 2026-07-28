import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOtherProducts = createAsyncThunk(
  'products/fetchOtherProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://crisp-project-server.onrender.com/other-products');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
