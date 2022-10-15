import React, { useRef, useState, useEffect } from 'react'
import Modal from '../UI/Modal'
import classes from './AddForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { expenseAction } from '../store/expenses'

const EditForm = (props) => {
    // useEffect(()=>{

    // },[])
    const editData = useSelector(state => state.expense.editData)
    const dispatch = useDispatch()

    // console.log(editData);
    const [isError, setIsError] = useState(false)
    const titleRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    const title = editData[0].title
    const category = editData[0].category
    const price = editData[0].price
    const id = editData[0].id

    console.log(id);

    async function onSubmitHandler(e) {
        e.preventDefault();
        let url = `https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/newexpenses/${id}/data.json`

        try {

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    expenseCategory: categoryRef.current.value,
                    expensePrice: priceRef.current.value,
                    expenseTitle: titleRef.current.value


                })
            })
            const data = await response.json();
            console.log(data);
            props.onshowData()
            cancelButtonHandler()

        }

        catch (e) {
            console.log(e);
            setIsError(true)
        }

    }

    function cancelButtonHandler() {

        dispatch(expenseAction.editable(false))


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
                        <button type='button' onClick={cancelButtonHandler}> Cancel</button>


                    </div>

                </form>
                {isError && <p style={{ textAlign: 'center', color: 'red', fontSize: '20px' }}> Error Please Try again!!!</p>}
            </div>
        </Modal>
    )
}

export default EditForm