import React, { useRef } from 'react'
import Modal from '../UI/Modal'
import classes from './AddForm.module.css'
import { useSelector } from 'react-redux'

const EditForm = () => {
    const editData = useSelector(state => state.expense.editData)
    const titleRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    const title = editData[0].title
    const category = editData[0].category
    const price = editData[0].price
    const id = editData[0].id

    async function onSubmitHandler(e) {
        e.preventDefault();
        let url = `https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/newexpenses/${id}.json`

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    expenseCategory: categoryRef,
                    expensePrice: priceRef,
                    expenseTitle: titleRef

                }
            })
        })

        const data = response.json();
        console.log(data);




    }
    return (
        <Modal>
            <div>
                <form onSubmit={onSubmitHandler} className={classes.form}>
                    <div>
                        <label>Expense Title</label>
                        <input defaultValue={title} ref={titleRef} type='text' placeholder='Enter Expense Title' />
                    </div>
                    <div>
                        <label>Category</label>
                        <input defaultValue={category} ref={categoryRef} type='text' placeholder='Enter Category' />
                    </div>
                    <div>
                        <label>Price</label>
                        <input defaultValue={price} ref={priceRef} type='number' placeholder='Enter Price' />
                    </div>
                    <div>
                        <button type='submit'> Edit</button>


                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default EditForm