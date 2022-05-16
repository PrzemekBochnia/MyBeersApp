import React from "react";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import MyBeerApp from "./components/AppPage/MyBeerApp";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/HomePage/Home";
import Login from "./components/LogReg/Login";
import Registration from "./components/LogReg/Registration";

const App = () =>{
    return(
        <AuthProvider>
          <Router>
            <Routes>
              <Route path ='/' element={<Home/>}/>
              <Route path ='/login' element={<Login/>}/>
              <Route path ='/registration' element={<Registration/>}/>
              <Route path ='/myBeersApp' element={<MyBeerApp/>}/>
        </Routes>
      </Router>    
     </AuthProvider> 
    )
};
export default App;