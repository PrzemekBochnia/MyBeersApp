import FacebookImg from "../../../Assets/Facebook.svg";
import InstagramImg from "../../../Assets/Instagram.svg"
import classes from "./Footer.module.css";

const Footer = () =>{
    return(
        <footer className={classes.footer}>
            <div className={classes.footerContainer}>
                <h1 className={classes.footerLogo}>My<span>Beers</span></h1>
            </div>
            <div className={classes.footerImg}>
                <img className={classes.facebookImg} src={FacebookImg} alt="facebook"/>
                <img className={classes.instagramImg} src={InstagramImg} alt="instagram"/>
            </div>
        </footer>
    )
};
export default Footer;