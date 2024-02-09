import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    token: ""
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action: PayloadAction<any>) => {
            state.token = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(state.token));
        },
        logout: (state) => {
            state.token = "";
            localStorage.removeItem('currentUser');
        },
        login: (state, action: PayloadAction<any>) => {
            state.token = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(state.token));
        }
    }
});


export const { register, logout, login } = auth.actions;
export default auth.reducer;