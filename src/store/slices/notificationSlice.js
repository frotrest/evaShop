import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    open: false,
    severity: 'info',
    message: '',
  },
  reducers: {
    showNotification: (state, action) => {
      state.open = true;
      state.severity = action.payload.severity || 'info';
      state.message = action.payload.message || '';
    },
    hideNotification: (state) => {
      state.open = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
