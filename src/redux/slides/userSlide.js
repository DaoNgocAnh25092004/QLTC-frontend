import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    phone: '',
    avatar: '',
    userId: '',
    isLoggedIn: false,
};

export const userSlice = createSlice({
    devTools: true,
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, phone, userId, avatar } = action.payload;

            state.name = name;
            state.email = email;
            state.phone = phone;
            state.isLoggedIn = true;
            state.userId = userId;
            state.avatar = avatar;
        },
        resetUser: (state, action) => {
            state.name = '';
            state.email = '';
            state.phone = '';
            state.isLoggedIn = false;
            state.userId = '';
            state.avatar = '';
        },
    },
});

// Export the actions
export const { updateUser, resetUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
