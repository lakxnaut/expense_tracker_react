import React, { useEffect, useState } from 'react'
import classes from './ShowForm.module.css'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { expenseAction } from '../store/expenses';


const ShowForm = (props) => {
    const dispatch = useDispatch()
    const expenseData = useSelector(state => state.expense.expensedata)
    const { showData } = props

    // console.log(showData);

    // const [formdata, setFormData] = useState([])
    // async function showdata() {
    //     const url = 'https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/expenses.json';
    //     const resp = await axios(url)

    //     setFormData(resp)
    //     console.log(formdata);
    // }

    // useEffect(() =>   {

    //     showdata()



    // }, [formdata])

    async function onEditHandler(id, title, price, categoty) {
        props.onEdit(true)

        props.editValues(id, title, price, categoty)

        // const url = `https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/expenses/${id}.json`
        // const resp = await axios.put(url)
        // const data = resp.data;


        // props.onshowData()

    }
    async function onRemoveHandler(id) {







        // const url = `https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/expenses/${id}.json`

        // const resp = await axios.delete(url)
        // const data = resp.data;
        // console.log(data);

        // props.onshowData()


    }
    return (
        <div className={classes.ShowForm}>
            {expenseData.map(item => {






                return (<div className={classes.ShowFormContainer}>
                    <div>{item.expenseTitle}</div>
                    <div>{item.expensePrice}</div>
                    <div>{item.expenseCategory}</div>
                    <div className={classes.buttons}>
                        <div><button onClick={() => onEditHandler(item.expenseId, item.expenseTitle, item.expensePrice, item.expenseCategory)}>Edit</button></div>

                        <div><button onClick={() => onRemoveHandler(item.expenseId)}>Remove</button></div>

                    </div>
                </div>)

            })}

        </div>
    )
}

export default ShowForm