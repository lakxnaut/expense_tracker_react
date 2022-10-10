import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import classes from './AddForm.module.css'

const AddForm = (props) => {
    const titleRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    async function submitHandler(e) {
        e.preventDefault();
        const url = 'https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/expenses.json'

        const resp = await axios.post(url, {
            data: {
                expenseTitle: titleRef.current.value,
                expenseCategory: categoryRef.current.value,
                expensePrice: priceRef.current.value,

            }
        })


        if (resp.status === 200) {
            const resp = await axios(url)
            const data = resp.data;
            // console.log(data);

            // const map = data.map(item => item)
            // console.log(map);
            const formData = []

            for (let item in data) {
                // console.log(data[item].data.expenseCategory);

                formData.push({
                    expenseTitle: data[item].data.expenseTitle,
                    expensePrice: data[item].data.expensePrice,
                    expenseCategory: data[item].data.expenseCategory,

                })


            }
            props.onshowData(formData)

        }



    }

    useEffect(() => { },)


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
                    <button>Add Expense</button>
                </div>
            </form>

        </div>
    )
}

export default AddForm