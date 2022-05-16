import About from "./Layout/About";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import LoginBar from "./UI/LoginBar";


const Home = () =>{
    return(
        <>
        <LoginBar/>
        <Header/>
        <About/>
        <Footer/>
        </>
    )
};
export default Home