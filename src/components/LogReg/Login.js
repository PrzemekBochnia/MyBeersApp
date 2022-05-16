import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import classes from "./Login.module.css"
import Header from "../HomePage/Layout/Header";

const Login = () =>{    
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login, logout} = useAuth();
    const {currentUser} = useAuth();
    const[error,setError] = useState("");
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault()          
        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate.push("/")
        }catch{
            setError("nie udało się zalogowac")
        }
        setLoading(false)
    };
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
                <div className={classes.loginBarElement}><Link className={classes.loginBarElement} to='/'>Back</Link></div>
                <div className={currentUser ? classes.hidden : classes.loginBarElement}><Link className={classes.loginBarElement} to='/registration'>Registration</Link></div>
                <div className={classes.loginBarElement}>{currentUser && currentUser.email}</div>
                <div className={currentUser ? classes.loginBarElement : classes.hidden} onClick={handleLogout}>LogOut</div>
            </div>
        </section>
        <Header/>
        <div className={classes.loginContainer}>
            <h1>Log in</h1>
            <form className={classes.loginForm} onSubmit={handleSubmit}>
                <label htmlFor="email" >Email</label>
                <input type="text" name="Email" ref={emailRef}/>
                <label htmlFor="password" >password</label>
                <input type="password"  ref={passwordRef}/>
                <div className={classes.logRegButtonsContainer}>
                    <button className={classes.logRegBtn} type="submit">Log In</button>
                </div>
            </form>
        </div>
        </>
    )
};
export default Login;