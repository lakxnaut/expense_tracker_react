import { createSlice } from '@reduxjs/toolkit'

const initialState = { darkTheme: false }

const themeSlice = createSlice({
    name: 'name',
    initialState,
    reducers: {
        theme(state) {
            state.darkTheme = !state.darkTheme

            console.log(state.darkTheme);

        }



    }
})

export default themeSlice.reducer;
export const themeActions = themeSlice.actions