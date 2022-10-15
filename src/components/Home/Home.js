import React, { useState, useEffect } from 'react'
import classes from './Home.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import AddForm from './AddForm'
import ShowForm from './ShowForm'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { expenseAction } from '../store/expenses'
import { themeActions } from '../store/theme'
import { CSVLink } from 'react-csv'


const Home = () => {

    const expenseData = useSelector(state => state.expense.expensedata)
    const total = useSelector(state => state.expense.total)
    const isDarkTheme = useSelector(state => state.theme.darkTheme)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [data, setData] = useState([])
    const [isEdit, setIsEdit] = useState(false);


    useEffect(() => {
        showDataHandler()
        console.log('hello');

    }, [])
    console.log(expenseData);

    const headers = [
        {
            label: "Title", key: "expenseTitle"
        },
        {
            label: "Price", key: "expensePrice"
        },
        {
            label: "Category", key: "expenseCategory"
        }
    ]
    const csvLink = {
        headers: headers,
        data: expenseData,
        filename: "ExpenseData.csv"
    }




    function logOutHandler() {
        localStorage.removeItem('token')
        navigate('/auth')

    }

    async function showDataHandler() {
        console.log('hello');

        try {
            const formData = []
            const url = 'https://expense-tracker-react-47a12-default-rtdb.firebaseio.com/newexpenses.json'

            const resp = await axios(url)
            const data = resp.data;


            for (let item in data) {
                console.log(data[item].data.expenseCategory);


                formData.push({
                    expenseId: item,
                    expenseTitle: data[item].data.expenseTitle,
                    expensePrice: Number(data[item].data.expensePrice),
                    expenseCategory: data[item].data.expenseCategory,

                })


            }

            // console.log(typeof formData[0].expensePrice);
            dispatch(expenseAction.expensedata(formData))
            // setData(formData)

        }

        catch (error) {
            console.log(error);
        }



    }
    function isEditHandler(iseditable) {
        dispatch(expenseAction.editable(true))



    }
    function editValuesHandler(id, title, price, categoty) {
        dispatch(expenseAction.editData({
            title, id, price, categoty
        }))


    }

    function premiumHandler() {
        dispatch(themeActions.theme())
    }

    // const themeClass = isDarkTheme ? ${classes.darkTheme} :
    // console.log(themeClass)

    // const themeclass = isDarkTheme ? `${classes.darkTheme}` : '';
    // console.log(themeclass);

    return (


        <div className={`${classes.home}`}>
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
            {total > 10000 ? (<div className={classes.premiumButtonContainer}>
                <button onClick={premiumHandler} className={classes.premiumButton}>Activate Premium</button>
            </div>) : ''}
            <div className={classes.downloadButtonContainer}><button className={classes.downloadButton}><CSVLink {...csvLink}>Export to CSV</CSVLink></button></div>
            <ShowForm editValues={editValuesHandler} onEdit={isEditHandler} onshowData={showDataHandler} />
        </div>
    )
}

export default Home