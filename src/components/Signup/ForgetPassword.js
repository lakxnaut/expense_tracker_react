import React, { useRef, useState } from 'react'
import classes from './AuthPage.module.css'
import { Navigate, useNavigate } from 'react-router-dom'


const ForgetPassword = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const [error, setError] = useState('false')
    const [spinner, setSpinner] = useState(false);
    async function submitForm(e) {
        e.preventDefault();
        setSpinner(true);

        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA2aEc-PCnPRnGxUhQ9Jsdx2azB6BHgOQc'

        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: emailRef.current.value

            })
        })

        const data = await resp.json();

        if (resp.ok) {
            setError("Success, Check your email")

        }
        else {
            setError(data.error.message)
        }
        console.log(data);

        setSpinner(false)



    }
    return (
        <div className={classes.signup}>
            <form className={`${classes.form} `} onSubmit={submitForm}>
                <h1>Forget Password</h1>
                <p>Enter the email with which you have regiserted</p>
                <div className={classes.textFields}>

                    <input type='email' ref={emailRef} placeholder='Email' required />



                    <div className={classes.signupContainer}>
                        <button className={classes.signupButton}>Send Link</button>
                    </div>

                    <div className={classes.forgetButtonContainer}>
                        <button onClick={() => {
                            navigate('/auth')
                        }} className={classes.forgetButton}>Already a User? Login</button>
                    </div>

                    <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}> {error}</p>







                </div>
            </form>

            {spinner && <div className={classes.loader}></div>}





            {/* <button onClick={toggleSignup} className={classes.loginButton}>{isSignupScreen ? 'Have an Account? Login' : 'Dont have an Acoount? Sign up'}</button> */}



        </div>
    )
}

export default ForgetPassword