import React, { useState, useEffect } from 'react'
import classes from './Home.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import AddForm from './AddForm'
import ShowForm from './ShowForm'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { expenseAction } from '../store/expenses'

const Home = () => {
    const expenseData = useSelector(state => state.expense.expensedata)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [data, setData] = useState([])
    const [isEdit, setIsEdit] = useState(false);

    // useEffect(() => {
    //     showDataHandler()
    //     console.log('hello');

    // }, [expenseData])





    function logOutHandler() {
        localStorage.removeItem('token')
        navigate('/auth')

    }

    async function showDataHandler() {
        console.log('hello');
        const formData = []
        const url = 'https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/expenses.json'

        const resp = await axios(url)
        const data = resp.data;


        for (let item in data) {
            // console.log(data[item].data.expenseCategory);s


            formData.push({
                expenseId: item,
                expenseTitle: data[item].data.expenseTitle,
                expensePrice: data[item].data.expensePrice,
                expenseCategory: data[item].data.expenseCategory,

            })


        }
        dispatch(expenseAction.expensedata(formData))
        // setData(formData)


    }
    function isEditHandler(iseditable) {
        setIsEdit(iseditable)

    }
    function editValuesHandler(id, title, price, categoty) {

    }
    return (
        <div className={classes.home}>
            <div className={classes.header}>
                <p>Welcome to Expense Tracker</p>
                <div className={classes.profileclickContainer}>
                    <p>Your Profile is Incomplete. </p>
                    <NavLink to='/profile'> <p className={classes.link}>
                        Complete Now

                    </p>
                    </NavLink>
                    <button onClick={logOutHandler}>Logout</button>
                </div>
            </div>
            <AddForm onEdit={isEditHandler} isEdit={isEdit} onshowData={showDataHandler} />
            <ShowForm editValues={editValuesHandler} onEdit={isEditHandler} onshowData={showDataHandler} />
        </div>
    )
}

export default Home