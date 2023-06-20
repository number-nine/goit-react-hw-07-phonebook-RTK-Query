import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filterSlice';
import authReducer from './authSlice';
import { contactsApi } from './contactsApi';
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    auth: authReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

