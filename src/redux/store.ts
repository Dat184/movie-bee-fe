import { combineReducers, configureStore } from '@reduxjs/toolkit'

import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import authReducer from './slice/authSlice'
import userReducer from './slice/userSlice'
import genreReducer from './slice/genreSlice'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['login'] // MẤU CHỐT: Chỉ whitelist 'login' tại đây
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['auth', 'user']
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer,
  genre: genreReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export let persistor = persistStore(store)
