import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import classes from "./BeerSearch.module.css"

const BeerSearch = ({search}) => {
    const[beers, setBeers] = useState([]);
    const[error,setError] = useState();
    const [searchValue, setSearchValue] = useState("");
    const[searchedByName,setSearchedByName] = useState([]);
    const[searchedByBrewery, setSearchedByBrewery] = useState([]);
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

    const searchBeerHandler = () =>{
        let searchedBeers = [...beers]
        const filteredByName = searchedBeers.filter(beer => beer.beerName === searchValue)
        setSearchedByName(filteredByName)
        const filteredByBrewery = searchedBeers.filter(beer => beer.brewery ===searchValue)
        setSearchedByBrewery(filteredByBrewery)
    };
    const BeersByName = searchedByName.map((beer)=>{
        return(
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
        )
    });
    const BeersByBrewer = searchedByBrewery.map((beer)=>{
        return(
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
        )
    });

  return (
      <>
      <div className={search ? classes.showSearchList : classes.hidden}>
        <h2>Search beers by name or brewery</h2>
        <input
        type="text"
        name="search"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        />
        <button onClick={searchBeerHandler}>Search</button>
        <div className={classes.searchedList}>
        {BeersByName}
        </div>
        <div className={classes.searchedList}>
        {BeersByBrewer}
        </div>
     </div>
        </>
  )
};
export default BeerSearch;
