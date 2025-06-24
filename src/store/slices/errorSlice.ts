import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  isOpen: boolean;
  message: string;
  title: string;
}

const initialState: ErrorState = {
  isOpen: false,
  message: '',
  title: 'Error'
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (state, action: PayloadAction<{ message: string; title?: string }>) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.title = action.payload.title || 'Error';
    },
    hideError: (state) => {
      state.isOpen = false;
      state.message = '';
      state.title = 'Error';
    }
  }
});

export const { showError, hideError } = errorSlice.actions;
export default errorSlice.reducer; 