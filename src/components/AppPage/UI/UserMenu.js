import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import WelcomeUser from "../Layout/WelcomeUser";
import BeerForm from "./BeerForm";
import BeerList from "./BeerList";
import BeerSearch from "./BeerSearch";
import BeersRank from "./BeersRank";
import BeersToDrink from "./BeersToDrink";
import classes from "./UserMenu.module.css";

const UserMenu = () =>{

    const[isActive, setActive] = useState(false);
    const[showBeerList, setShowBeerList] = useState(true);
    const[showBeersToDrink, setShowBeersToDrink] = useState(false);
    const[showRank, setShowRank] = useState(false);
    const[welcome, setWelcome] = useState(true);
    const[search, setSearch] = useState(false)
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
    };
    const toggleClass = () =>{
        setActive(true)
        setShowBeerList(false)
        setShowRank(false)
        setShowBeersToDrink(false)
        setWelcome(false)
        setSearch(false)
    }; 
    const switchBeerList = () =>{   
        setShowBeerList(true)
        setActive(false)
        setShowBeersToDrink(false)
        setShowRank(false)
        setWelcome(false)
        setSearch(false)
    };
    const switchBeersToDrink = () =>{   
        setShowBeersToDrink(true)
        setActive(false)
        setShowBeerList(false)
        setShowRank(false)
        setWelcome(false)
        setSearch(false)
    };
    const switchRank = () =>{
        setShowRank(true)
        setActive(false)
        setShowBeerList(false)
        setShowBeersToDrink(false)
        setWelcome(false)
        setSearch(false)
    };
    const switchWelcomeUser = () =>{
        setWelcome(true)
        setActive(false)
        setShowBeerList(false)
        setShowBeersToDrink(false)
        setShowRank(false)
        setSearch(false)
    }
    const switchSearch = () =>{
        setSearch(true)
        setActive(false)
        setShowBeerList(false)
        setShowBeersToDrink(false)
        setShowRank(false)
    }


    return(
        <>
        <div className={classes.userMenuContainer}>
            <h1 className={classes.userMenuWelcome} onClick={()=>switchWelcomeUser()}>Hi {currentUser && currentUser.email}</h1>
            <div className={classes.userMenuItem} onClick={()=>switchBeerList()}>My Beers <span className={classes.mLetter}>Menu</span></div>
            <div className={classes.userMenuItem} onClick={()=>switchSearch()}>Search Beers</div>
            <div className={classes.userMenuItem} onClick={()=>switchBeersToDrink()} >Beers to drink </div>
            <div className={classes.userMenuItem} onClick={()=>switchRank()}>Rank</div>
            <button className={classes.userMenuBtn} onClick={()=>toggleClass()}>Add new beer</button>
            <button className={classes.userMenuBtn} onClick={()=>handleLogout()}><Link to="/">Log Out</Link></button>
        </div>
        <WelcomeUser welcome = {welcome}/>
        <BeerForm isActive={isActive}/>
        <BeerList showBeerList={showBeerList}/>
        <BeersToDrink showBeersToDrink={showBeersToDrink}/>
        <BeersRank showRank = {showRank} />
        <BeerSearch search = {search}/>
        </>
    )
};
export default UserMenu;