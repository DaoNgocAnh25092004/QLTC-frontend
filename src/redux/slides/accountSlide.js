import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    phone: '',
    avatar: '',
    userId: '',
    isLoggedIn: false,
};

export const accountSlice = createSlice({
    devTools: true,
    name: 'account',
    initialState,
    reducers: {
        updateAccount: (state, action) => {
            const { username, email, phone, userId, avatar } = action.payload;

            state.username = username;
            state.email = email;
            state.phone = phone;
            state.isLoggedIn = true;
            state.userId = userId;
            state.avatar = avatar;
        },
        resetAccount: (state, action) => {
            state.username = '';
            state.email = '';
            state.phone = '';
            state.isLoggedIn = false;
            state.userId = '';
            state.avatar = '';
        },
    },
});

// Export the actions
export const { updateAccount, resetAccount } = accountSlice.actions;

// Export the reducer
export default accountSlice.reducer;
