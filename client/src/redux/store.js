import { configureStore } from '@reduxjs/toolkit'
import Reducer from './user/userSlice'

export const store = configureStore({
  reducer: {user:Reducer},
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  }),
})
