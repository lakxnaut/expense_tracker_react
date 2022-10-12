import { configureStore } from "@reduxjs/toolkit";
import expenses from './expenses'
import auth from './auth'
import theme from "./theme";


const store = configureStore({
    reducer: {
        expense: expenses,
        Myauth: auth,
        theme: theme
    }
})

export default store