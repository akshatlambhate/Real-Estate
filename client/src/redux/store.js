import { combineReducers, configureStore } from '@reduxjs/toolkit'
import Reducer from './user/userSlice'
import{persistReducer} from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage';

const persistConfig ={
    key:"root",
    storage,
    version:1,
}


const rootReducer = combineReducers({user:Reducer})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: {user:persistedReducer},
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  }),
});

export const persistor = persistStore(store);