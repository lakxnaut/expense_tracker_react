import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = { token: 'abc' }


const authSlice = createSlice({

    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload
        },


    }


})

export default authSlice.reducer;
export const authActions = authSlice.actions