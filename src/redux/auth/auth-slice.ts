import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    user: {
        token: localStorage.getItem("currentUser")
    }
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(state.user));
        },
        logout: (state) => {
            state.user = { token: "" };
            localStorage.removeItem('currentUser');
        },
        login: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(state.user));
        }
    }
});


export const { register, logout, login } = auth.actions;
export default auth.reducer;