import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'login/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://crisp-project-server.onrender.com/users',
        formData,
      );

      const user = response.data;
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const singUpUser = createAsyncThunk(
  'login/singUpUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://crisp-project-server.onrender.com/users');
      const users = response.data;

      const validUser = users.find((u) => u.Email === email || u.email === email);

      if (!validUser) {
        return rejectWithValue("There's no user with this name");
      }

      if (validUser.password !== password && validUser.Password !== password) {
        return rejectWithValue('Incorrect password');
      }

      return validUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `https://crisp-project-server.onrender.com/users/${userId}`,
        updatedData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update profile');
    }
  },
);
