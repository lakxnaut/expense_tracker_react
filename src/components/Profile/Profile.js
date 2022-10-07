import React, { useRef } from 'react'
import classes from './Profile.module.css'
import { AiFillGithub } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";

const Profile = () => {
    const nameRef = useRef();
    const profileRef = useRef();

    async function onUpdate() {
        const name = nameRef.current.value;
        const profile = profileRef.current.value;
        const token = localStorage.getItem('token')
        console.log(token);

        if (name && profile) {

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBVAE7aUSl9yyrZqGn-MO-JWRkJvemcR3g', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: localStorage.getItem('token'),
                    displayName: name,
                    photoUrl: profile,

                    returnSecureToken: true,

                })
            })

            const data = await response.json();
            console.log(data);





        }


    }
    return (
        <div className={classes.profile}>
            <div className={classes.heading}>
                <h1>Contact Details</h1>
                <div>
                    <button className={classes.cancelButton}>Cancel</button>
                </div>
            </div>


            <div className={classes.profileinfoContainer}>
                <div className={classes.profileinfo}>
                    <AiFillGithub />
                    <p>Full Name:</p>
                    <input ref={nameRef} type='text' />

                </div>
                <div className={classes.profileinfo}>

                    <BsGlobe />
                    <p>Profile Photo URL</p>
                    <input ref={profileRef} type='text' />




                </div>

            </div>
            <div className={classes.updatebutton}>
                <button onClick={onUpdate}>Update</button>

            </div>

        </div>
    )
}

export default Profile