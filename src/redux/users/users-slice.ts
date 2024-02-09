import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}


const initialState: { users: User[] } = {
    users: JSON.parse(localStorage.getItem('users') || '[]'),
}

export const users = createSlice({
    name: "users",
    initialState,
    reducers: {
        toggleUser: (state, action: PayloadAction<any>) => {
            const savedUser = state.users.find(user => user.id === action.payload.id);

            if (savedUser) {
                const findIndex = state.users.indexOf(savedUser);
                state.users.splice(findIndex, 1);
                localStorage.setItem('users', JSON.stringify(state.users));
            } else {
                state.users.push(action.payload);
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        }
    }
});

export const { toggleUser } = users.actions;
export default users.reducer;