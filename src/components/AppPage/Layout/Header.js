import { Link } from "react-router-dom";
import classes from "./Header.module.css"
import BeerImg from "../../../Assets/3.jpg"
import { useAuth } from "../../../context/AuthContext";
import LoginBar from "../../HomePage/UI/LoginBar";

const Header = () =>{
    const {currentUser} = useAuth()
    return(
        <>
        <LoginBar/>
        <header className={classes.header}>
            <div className={classes.headerContainer}>
                <h1 className={classes.logo}>My<span>Beers</span></h1>
                <nav>
                    <ul className={classes.headerNav}>
                    <li className={classes.navElement}><Link to='/'>Back</Link></li>
                    <li className={classes.navElement}>{currentUser && currentUser.email}</li>
                    </ul>
                </nav>
            </div>
            <label>
                <input type="checkbox"/>
                <span className={classes.menu}> <span className={classes.hamburger}></span> </span>
                <ul>
                    <li><Link to='/'>Back</Link></li>
                    <li>About</li>
                </ul>
            </label>
            <div className={classes['mainImage']}>
                <img src={BeerImg} alt='beer'/>
            </div>   
        </header>    
        </>
    )
};
export default Header