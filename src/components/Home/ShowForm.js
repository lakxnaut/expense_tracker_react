import React, { useEffect, useState } from 'react'
import classes from './ShowForm.module.css'
import axios from 'axios';


const ShowForm = (props) => {
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
    return (
        <div className={classes.ShowForm}>
            {showData.map(item => {




                return (<div className={classes.ShowFormContainer}>
                    <div>{item.expenseTitle}</div>
                    <div>{item.expensePrice}</div>
                    <div>{item.expenseCategory}</div>
                </div>)

            })}

        </div>
    )
}

export default ShowForm