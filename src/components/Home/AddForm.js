import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import classes from './AddForm.module.css'
import { useSelector, useDispatch } from 'react-redux';

const AddForm = (props) => {

    const isEditable = useSelector(state => state.expense.isEditable)


    const titleRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    async function submitHandler(e) {
        e.preventDefault();
        const url = 'https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/newexpenses.json'

        const resp = await axios.post(url, {
            data: {
                expenseTitle: titleRef.current.value,
                expenseCategory: categoryRef.current.value,
                expensePrice: priceRef.current.value,

            }
        })


        if (resp.status === 200) {



            props.onshowData()

        }



    }

    useEffect(() => { },)

    console.log(props.isEdit);

    function onEditButtonHandler() {
        props.onEdit(false)
    }
    return (
        <div className={classes.AddForm}>

            <form onSubmit={submitHandler} className={classes.form}>
                <div>
                    <label>Expense Title</label>
                    <input ref={titleRef} type='text' placeholder='Enter Expense Title' />
                </div>
                <div>
                    <label>Category</label>
                    <input ref={categoryRef} type='text' placeholder='Enter Category' />
                </div>
                <div>
                    <label>Price</label>
                    <input ref={priceRef} type='number' placeholder='Enter Price' />
                </div>
                <div>
                    {props.isEdit ? (<button onClick={onEditButtonHandler}> Edit Expense</button>) : (<button type='submit'> Add Expense</button>)}


                </div>
            </form>

        </div>
    )
}

export default AddForm