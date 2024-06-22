import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './themeReducer';

export default configureStore({
  reducer: {
    auth: authReducer, 
    theme: themeReducer,
  },
});
