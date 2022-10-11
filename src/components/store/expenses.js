import { createSlice } from '@reduxjs/toolkit';


const initialState = { expensedata: [], total: 0 }

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        expensedata(state, action) {
            state.expensedata = action.payload

            console.log(state.expensedata);



            // const mapp = state.expensedata.map(item => item);
            // console.log(mapp);
        },



        total(state, action) {
            state.total = action.payload
        }
    }
})

export default expenseSlice.reducer;
export const expenseAction = expenseSlice.actions