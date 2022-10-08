import React, { useEffect, useRef, useState } from 'react'
import classes from './AuthPage.module.css'
import { useNavigate } from 'react-router-dom'



const ConfirmEmail = () => {
    const codeRef = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [errorClass, setErrorClass] = useState('');

    function submitForm(e) {
        e.preventDefault();


    }

    async function confirmEmail() {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBVAE7aUSl9yyrZqGn-MO-JWRkJvemcR3g'
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: localStorage.getItem('token')
            })
        })

        if (resp.ok) {
            const data = await resp.json();
            console.log(data);
        }




        // navigate('/')

    }

    useEffect(() => {

        // confirmEmail()

    },)
    return (
        <div className={classes.signup}>

            <form className={`${classes.form} ${errorClass} `} onSubmit={submitForm}>

                <h1>Confirm Password</h1>
                <p>We have sent you a code on your email </p>
                <div className={classes.textFields}>

                    <input type='email' ref={codeRef} placeholder='Code' required />
                </div>

                <div className={classes.signupContainer}>
                    <button className={classes.signupButton}>Confirm Password</button>
                </div>


                <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}> {error}</p>
            </form>


        </div>
    )
}

export default ConfirmEmail