import { createSlice } from '@reduxjs/toolkit';
import { editableInputTypes } from '@testing-library/user-event/dist/utils';
import { useDispatch } from 'react-redux';
import { themeActions } from './theme';


const initialState = { expensedata: [], total: 0, editData: [], isEditable: false }

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


        },

        editable(state, action) {
            state.isEditable = action.payload

        },
        editingDatas(state, action) {
            state.editData.push({
                id: action.payload.id,
                title: action.payload.title,
                price: action.payload.price,
                category: action.payload.category,

            })


        }
    }
})

export default expenseSlice.reducer;
export const expenseAction = expenseSlice.actions