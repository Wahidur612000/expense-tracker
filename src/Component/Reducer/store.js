// store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer from './expenseSlice';

export default configureStore({
  reducer: {
    auth: authReducer, 
    expenses: expenseReducer, 
  },
});
