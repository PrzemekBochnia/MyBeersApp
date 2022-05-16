import React, { useState, useEffect } from "react";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import classes from "./BeersToDrink.module.css";
import { useAuth } from "../../../context/AuthContext";

const BeersToDrink = ({showBeersToDrink}) =>{
    const[img, setImg] = useState(null);
    const[imgUrl,setImgUrl] = useState('');
    const[beerName,setBeerName] = useState('');
    const[brewery,setBrewery] = useState('');
    const[beers, setBeers] = useState([]);
    const[error,setError] = useState();
    const {currentUser} = useAuth();

    const handleBeerName = (event) =>{
        setBeerName(event.target.value)
      };
      const handleBrewery = (event) =>{
        setBrewery(event.target.value)
      };
      const handleImg = () =>{
        if(img == null)return;
        const imgRef = ref(storage, `images/${img.name}`)
        uploadBytes(imgRef, img).then((snapshot)=>{
          getDownloadURL(snapshot.ref).then((url) => {
            setImgUrl(url)
          })
        })
      };
      const submitHandler = async(event) => {
        await fetch(`https://form-with-img-test-default-rtdb.firebaseio.com/users/${currentUser.uid}/beersToDrink.json`,{
        method: 'POST',
        body: JSON.stringify({ 
          beerName: beerName,
          brewery: brewery,
          foto: imgUrl
        })
      })
    };
    useEffect(()=>{
        const fetchBeers = async ()=>{
          const response = await fetch(`https://form-with-img-test-default-rtdb.firebaseio.com/users/${currentUser.uid}/beersToDrink.json`);
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
                await fetch(`https://form-with-img-test-default-rtdb.firebaseio.com/users/${currentUser.uid}/beersToDrink/${itemId}.json`,{
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
            };
        const beersToDrink = beers.map((beer)=>{
            return(
                <div key={beer.id} >
                    <ul className={classes.beerListItem} key={beer.id}>
                        <li> Beer Name: {beer.beerName}</li>
                        <li>Brewery: {beer.brewery}</li>
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
        <div className={showBeersToDrink ? classes.showBeersToDrink : classes.beersToDrinkContainer}>
            <div className={classes.formBtn}>
                <label>Photo</label>   
                <input type="file" onChange={(event)=>{setImg(event.target.files[0])}}></input>
                <button onClick={handleImg}>upload image</button>
                <img className={classes.smallImg} src={imgUrl} alt='beerImage'/> 
            </div>
            <form className={classes.beerForm} onSubmit={submitHandler}>
                <label>Beer Name</label>
                <input type="text" onChange={event=>{handleBeerName(event)}}></input>
                <label>Brewery</label>
                <input type="text"  onChange={event=>{handleBrewery(event)}}></input>
                <button>Submit</button>
            </form>
            <div className={classes.allBeers}>{beersToDrink}</div>
        </div>
    )
};
export default BeersToDrink;

