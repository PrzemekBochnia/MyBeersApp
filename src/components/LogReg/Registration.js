import classes from "./Registration.module.css";
import { Link, useNavigate  } from "react-router-dom";
import Header from "../HomePage/Layout/Header";
import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

const Registration = () =>{

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup, logout} = useAuth();
    const[error,setError] = useState("");
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {currentUser} = useAuth();

    async function handleSubmit(e){
        e.preventDefault()   
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("hasła nie sa takie same")
        }
        try{
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate.push("/")
        }catch{
            setError("nie udało się założyć konta")
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
                <div className={classes.loginBarElement}><Link className={classes.loginBarElement} to='/login'>Login</Link></div>
                <div className={classes.loginBarElement}>{currentUser && currentUser.email}</div>
                <div className={currentUser ? classes.loginBarElement : classes.hidden} onClick={handleLogout}>LogOut</div>
            </div>
        </section>
        <Header/>
        <div className={classes.regContainer}>
            <h1>Create account</h1>
            <form className={classes.regForm} onSubmit={handleSubmit} >
                <label htmlFor="email">Email</label>
                <input type="text" name="Email" ref={emailRef}/>
                <label htmlFor="password">password</label>
                <input type="password"ref={passwordRef}/>
                <label htmlFor="password">repeat password</label>
                <input type="password" ref={passwordConfirmRef}/>
                <div className={classes.logRegButtonsContainer}>
                    <button className={classes.logRegBtn} type="submit">SignUp</button>
                </div>
            </form>
        </div>
        </>
    )
};
export default Registration;