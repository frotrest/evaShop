import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import blogReducer from './slices/blogSlice';
import loginSlice from './slices/loginSlice';
import productsReducer from './slices/productsSlice';
import otherProductsReducer from './slices/otherProductsSlice';
import filterReducer from './slices/filterSlice';
import notificationReducer from './slices/notificationSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginSlice'],
};

const rootReducer = combineReducers({
  blogsSlice: blogReducer,
  loginSlice: loginSlice,
  products: productsReducer,
  otherProducts: otherProductsReducer,
  filters: filterReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
