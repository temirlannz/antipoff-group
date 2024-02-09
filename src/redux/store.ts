import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../redux/users/users-slice";
import authReducer from "../redux/auth/auth-slice";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        userReducer,
        authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;