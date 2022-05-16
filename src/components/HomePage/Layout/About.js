import classes from "./About.module.css";
import { Link } from "react-router-dom";

const About = () =>{
    return(
        <section className={classes.about}>
            <div className={classes.summary}>
                <h2>My Beers App</h2>
                <p>
                The My Beers application will allow you to create your own database of beers that you have already tried.</p>
                <p>
                You will be able to rate their taste, color and aroma. The application will allow you to create your own beer ranking and the list of beers you want to try.
                </p>
                <p>Log in or register if you don,t have account yet, and make your own beer list.</p>
                <button className={classes.aboutBtn}><Link to='/myBeersApp'>Go to App</Link></button>
            </div>    
      </section>
    )
};
export default About;