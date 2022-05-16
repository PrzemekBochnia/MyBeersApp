import classes from "./WelcomeUser.module.css";
import { useAuth } from "../../../context/AuthContext";

const WelcomeUser = ({welcome}) =>{
    const {currentUser} = useAuth();

    return(
        <>
        <div className={welcome ? classes.welcomeUserContainer : classes.hidden}>
            <h2> Hi {currentUser.email} on the left side you will find the menu, use it to add a new beer to your list.</h2>
        </div>
        </>
    )
};
export default WelcomeUser;