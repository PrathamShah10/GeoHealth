import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to local storage for web
import rootReducer from './reducer';
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const configureReducer = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
  });
  return store;
};
export const store = configureReducer();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { configureReducer };
