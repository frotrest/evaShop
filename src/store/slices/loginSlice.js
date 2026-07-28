import { createSlice } from '@reduxjs/toolkit';
import { registerUser, singUpUser, updateUserProfile } from '../async/userThunk';

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    user: [],
    userData: [],
    login: false,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = [];
      state.login = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(singUpUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(singUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = [action.payload];
        state.login = true;
      })
      .addCase(singUpUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData.push(action.payload);
        state.user = [action.payload];
        state.login = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = [
          {
            ...(state.user[0] || {}),
            ...action.payload,
          },
        ];
      });
  },
});

export const { logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
