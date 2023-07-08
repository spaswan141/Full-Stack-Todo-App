import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthAPi } from "../services/userAuthApi";
import userReducer  from "../features/userSlice";
import authReducer from "../features/authSlice"

export const store = configureStore({
  reducer: {
    [userAuthAPi.reducerPath]: userAuthAPi.reducer,
    user:userReducer,
    auth:authReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthAPi.middleware),
});

setupListeners(store.dispatch);
