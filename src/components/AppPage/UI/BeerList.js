import React, {useEffect, useState } from "react";
import classes from "./BeerList.module.css";
import { useAuth } from "../../../context/AuthContext";

const BeerList = ({showBeerList}) =>{
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
    const removeHandler = async (itemId,id)=>{      
      let newList = [...beers]              
              newList = beers.filter(({id})=> id !== itemId)
              console.log(newList);
              setBeers(newList)
              await fetch(`https://form-with-img-test-default-rtdb.firebaseio.com/users/${currentUser.uid}/posts/${itemId}.json`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                },
            })
            .then((response)=>{
                if(response.ok){
                }else{
                  throw new Error('could not delete data');
                }
              })
            .catch((error)=>{
              console.log(itemId);
            })
            window.location.reload();
          };
        
      const beerList = beers.map((beer)=>{
          return(
            <div key={beer.id} >
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
                      <button className={classes.removeBeerBtn} onClick={()=>removeHandler(beer.id)}> Remove</button>
                      {error}
                  </ul>
           </div>
          )
      });
       
      return(
        <div className={showBeerList ? classes.showBeerList : classes.beerListContainer}>
          <h2>Your Beers List</h2>
          <div className={classes.allBeers}>{beerList}</div>
        </div>
    )  
};
export default BeerList;
