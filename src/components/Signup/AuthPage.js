import React, { useRef, useState } from 'react'
import classes from './AuthPage.module.css'
import { useNavigate } from 'react-router-dom'


const AuthPage = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef();
    const [isSignupScreen, setIsSignupScreen] = useState(true);
    const [error, setError] = useState('');
    const [errorClass, setErrorClass] = useState('');

    const navigate = useNavigate();

    async function saveToken(data) {
        const resp = await data.json()
        const token = resp.idToken;
        localStorage.setItem('token', token)

        navigate('/')
    }


    async function submitForm(e) {
        e.preventDefault();
        setErrorClass('')



        const email = emailRef.current.value
        const password = passwordRef.current.value
        // const confirmPassword = confirmPasswordRef.current.value
        let url;
        if (isSignupScreen && (password === confirmPasswordRef.current.value)) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVAE7aUSl9yyrZqGn-MO-JWRkJvemcR3g'

        }
        else if (isSignupScreen && (password !== confirmPasswordRef.current.value)) {
            setError('Password and Confirm Password not matching ')
            setErrorClass(`${classes.error}`)
            return;
        }
        else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVAE7aUSl9yyrZqGn-MO-JWRkJvemcR3g'

        }








        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({

                email: email,
                password: password,
                returnSecureToken: true

            }
            )


        })

        if (response.ok) {
            saveToken(response)

        }
        else {
            const data = await response.json()
            setError(data.error.message);
        }






    }

    function toggleSignup() {
        setError('')
        setIsSignupScreen(prevValue => !prevValue)


    }
    return (
        <div className={classes.signup}>
            <form className={`${classes.form} ${errorClass} `} onSubmit={submitForm}>
                <h1>{isSignupScreen ? 'SignUp' : 'Login '}</h1>
                <div className={classes.textFields}>

                    <input type='email' ref={emailRef} placeholder='Email' required />

                    <input type='password' minLength='6' ref={passwordRef} placeholder='Password' required />

                    {isSignupScreen && <input type='password' minLength='6' ref={confirmPasswordRef} placeholder='Confirm Email' required />}
                    <div className={classes.signupContainer}>
                        <button className={classes.signupButton}>{isSignupScreen ? 'Sign Up' : "Login"}</button>
                    </div>

                    <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}> {error}</p>




                </div>
            </form>



            <button onClick={toggleSignup} className={classes.loginButton}>{isSignupScreen ? 'Have an Account? Login' : 'Dont have an Acoount? Sign up'}</button>



        </div>
    )
}

export default AuthPage