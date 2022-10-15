import React, { useEffect, useRef, useState } from 'react'
import classes from './ShowForm.module.css'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { expenseAction } from '../store/expenses';



const ShowForm = (props) => {
    const [title, setTitle] = useState(null)
    const titleRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    const dispatch = useDispatch()
    const expenseData = useSelector(state => state.expense.expensedata)
    const [isedit, setIsEdit] = useState(false)
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

    async function onEditHandler(item) {
        console.log(item);
        // setIsEdit(true)
        // props.onEdit(true)
        dispatch(expenseAction.editingDatas({
            id: item.expenseId,
            title: item.expenseTitle,
            category: item.expenseCategory,
            price: item.expensePrice
        }))

        // // props.editValues(id, title, price, categoty)
        // dispatch(expenseAction.expensedata(id, title, price, categoty))
        // const url = `https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/expenses/${id}.json`
        // const resp = await axios.put(url)
        // const data = resp.data;


        // props.onshowData()

    }
    async function onRemoveHandler(id) {

        const url = `https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/newexpenses/${id}.json`

        const resp = await axios.delete(url)
        const data = resp.data;
        console.log(data);

        props.onshowData()


    }

    async function EditingFormHandler(id) {


        const url = `https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/expenses/${id}.json`
        const resp = await axios.put(url, {
            data: {
                expenseTitle: titleRef.current.value,
                expenseCategory: categoryRef.current.value,
                expensePrice: priceRef.current.value,
            }

        })



        props.onshowData()

    }

    function crossbuttonhandler() {
        setIsEdit(false)
        console.log(isedit);

    }

    function titleHandler(e) {
        setTitle(e.target.value)
        console.log("title");

    }

    return (
        <div className={classes.ShowForm}>
            {expenseData.map((item) => {



                return <div className={classes.ShowFormContainer}>
                    <div> {item.expenseTitle} </div>
                    <div>{item.expensePrice} </div>
                    <div>{item.expenseCategory} </div>
                    <div className={classes.buttons}>

                        <div className={classes.buttons}>
                            <div><button onClick={() => onEditHandler(item)}>Edit</button></div>

                            <div><button onClick={() => onRemoveHandler(item.expenseId)}>Remove</button></div>
                        </div>



                    </div>
                </div>

            })}

        </div>
    )
}

export default ShowForm