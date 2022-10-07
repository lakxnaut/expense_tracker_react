import React from 'react'
import classes from './Home.module.css'
import { NavLink, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    function logOutHandler() {
        localStorage.removeItem('token')
        navigate('/auth')

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
        </div>
    )
}

export default Home