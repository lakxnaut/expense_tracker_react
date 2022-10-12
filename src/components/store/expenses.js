import { createSlice } from '@reduxjs/toolkit';


const initialState = { expensedata: [], total: 0 }

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        expensedata(state, action) {
            state.expensedata = action.payload

            console.log(state.expensedata[0].expensePrice);

            state.expensedata.reduce((acc, curr) => {
                return state.total = acc + curr.expensePrice
            }, 0)

            console.log(state.total);




        },



        total(state, action) {
            state.total = state.total + action.payload
            console.log(state.total);
        }
    }
})

export default expenseSlice.reducer;
export const expenseAction = expenseSlice.actions