import { configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER
// } from 'redux-persist';

import contactsReducer from './contactsSlice';
import filterReducer from './filterSlice';
import authReducer from './authSlice';
import { contactsApi } from './contactsApi';

// const rootReducer = combineReducers({
//   contacts: contactsReducer,
//   filter: filterReducer,
//   auth: authReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
    auth: authReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
  // getDefaultMiddleware =>
  // getDefaultMiddleware({
  //   serializableCheck: {
  //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //   },
  // }),
});

// export const persistor = persistStore(store);