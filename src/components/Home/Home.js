import React, { useState, useEffect } from 'react'
import classes from './Home.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import AddForm from './AddForm'
import ShowForm from './ShowForm'
import axios from 'axios'

const Home = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])



    async function allData() {
        const url = 'https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/expenses.json'
        const resp = await axios(url)
        const data = resp.data;

        const formData = []

        for (let item in data) {

            formData.push({
                expenseTitle: data[item].data.expenseTitle,
                expensePrice: data[item].data.expensePrice,
                expenseCategory: data[item].data.expenseCategory,

            })

            setData(formData)
        }
    }

    useEffect(() => {
        allData()
        console.log('hello');


    }, [])





    function logOutHandler() {
        localStorage.removeItem('token')
        navigate('/auth')

    }

    function showDataHandler(data) {
        setData(data)


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
            <AddForm onshowData={showDataHandler} />
            <ShowForm showData={data} />
        </div>
    )
}

export default Home