import { configureStore } from "@reduxjs/toolkit";
import expenses from './expenses'
import auth from './auth'


const store = configureStore({
    reducer: {
        expense: expenses,
        Myauth: auth
    }
})

export default store