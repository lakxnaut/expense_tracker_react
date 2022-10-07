import React from 'react'
import classes from './Home.module.css'
import { NavLink } from 'react-router-dom'

const Home = () => {
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
                </div>
            </div>
        </div>
    )
}

export default Home