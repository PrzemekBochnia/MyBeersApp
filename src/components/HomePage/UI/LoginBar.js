import classes from "./LoginBar.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";

const LoginBar = () =>{
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate();
    const[error, setError] =  useState('');

    async function handleLogout() {
        setError("")
        try{
        await logout()
        navigate.push("/")
        }catch{
            setError("nie udało sie wylogować")
        }
        window.location.reload();
    };

    return(
        <>
        <section className={classes.loginBar}>
            <div className={classes.loginBarContainer}>
                <div className={currentUser ? classes.hidden : classes.loginBarElement}><Link className={classes.loginBarElement} to='/login'>Log In</Link></div>
                <div className={currentUser ? classes.hidden : classes.loginBarElement}><Link className={classes.loginBarElement} to='/registration'>Registration</Link></div>
                <h2>{currentUser && currentUser.email}</h2>
                <div className={currentUser ? classes.loginBarElement : classes.hidden} onClick={handleLogout}>LogOut</div>
            </div>
        </section>
        </>
    )
};
export default LoginBar;