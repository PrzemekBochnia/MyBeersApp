import React, {useEffect, useState } from "react";
import classes from "./BeersRank.module.css";
import { useAuth } from "../../../context/AuthContext";


const BeersRank = ({showRank}) =>{


    const[beers, setBeers] = useState([]);
    const[error,setError] = useState();

    const {currentUser} = useAuth();

    useEffect(()=>{
        const fetchBeers = async ()=>{
          const response = await fetch(`https://form-with-img-test-default-rtdb.firebaseio.com/users/${currentUser.uid}/posts.json`);
          if(!response.ok){
            throw new Error('Something went wrong!')
          }
          const responseData = await response.json();
          const loadedBeers = [];
          for(const key in responseData){
            loadedBeers.push({
              id: key,
              beerName: responseData[key].beerName,
              brewery: responseData[key].brewery,
              description: responseData[key].description,
              color: responseData[key].color,
              aroma: responseData[key].aroma,
              bitter: responseData[key].bitter,
              flavor: responseData[key].flavor,
              rate: responseData[key].rate,
              foto: responseData[key].foto
            })
          }
          setBeers(loadedBeers)          
        }
        fetchBeers().catch((error)=>{
            setError(error.message);
        })
    },[currentUser]);
  
        beers.sort((a, b) => (parseInt (a.rate) < parseInt(b.rate)) ? 1 : -1 );
        const BeersRank = beers.map((beer)=>{
            return(
              <div className={classes.rankBeersContainer} key={beer.id} >
                <ul className={classes.beerListItem} key={beer.id}>
                        <li> Beer Name: {beer.beerName}</li>
                        <li>Brewery: {beer.brewery}</li>
                        <li>Description: {beer.description}</li>
                        <li>Color: {beer.color}</li>
                        <li>Aroma: {beer.aroma}</li>
                        <li>Bitter: {beer.bitter}</li>
                        <li>Flavor: {beer.flavor}</li>
                        <li>Rate: {beer.rate}</li>
                        <div>
                        <img className={classes.image} src={beer.foto} alt='smallBeer'/>
                        </div>
                    </ul>
            </div>
            )
        });
      

    return(
        <div className={showRank ? classes.showRank : classes.rankContainer}>
            <h2>Beer Rank</h2>
            <div className={classes.beersRank}>{BeersRank}</div>
        </div>
    )
};
export default BeersRank;