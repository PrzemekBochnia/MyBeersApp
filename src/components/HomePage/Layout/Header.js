import classes from "./Header.module.css";
import BeerImg from "../../../Assets/15.jpg";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";

const Header = () =>{
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
        <header className={classes.header}>
            <div className={classes.headerContainer}>
                <h1 className={classes.logo}>My<span>Beers</span></h1>
                <nav>
                    <ul className={classes.headerNav}>
                    <li className={classes.navElement}><Link to='/myBeersApp'>Go to App</Link></li>
                    <li className={classes.navElement}>About</li>
                    </ul>
                </nav>
            </div>
            <label>
                <input type="checkbox"/>
                <span className={classes.menu}> <span className={classes.hamburger}></span> </span>
                <ul>
                    <li><Link to='/myBeersApp'>Go to App</Link></li>
                    <li><Link to='/'>Back</Link></li>
                    <li className={currentUser ? classes.hidden :  classes.menuItem}><Link to='/login'>Log In</Link></li>
                    <li className={currentUser ? classes.hidden :  classes.menuItem}><Link to='/registration'>Registration</Link></li>
                    <li className={currentUser ? classes.menuItem : classes.hidden} onClick={handleLogout}>LogOut</li>
                </ul>
            </label>
        <div className={classes['mainImage']}>
            {currentUser ? <h2 className={classes.welcome}>Welcome {currentUser.email}</h2> : <span></span>}
            <img src={BeerImg} alt='beer'/>
        </div>   
        </header>
        </>  
          )
};
export default Header;

