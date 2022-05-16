import React, { useState } from "react";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../../context/AuthContext";
import classes from "./BeerForm.module.css";

const BeerForm = ({isActive}) => {

  const[img, setImg] = useState(null);
  const[imgUrl,setImgUrl] = useState('');
  const[beerName,setBeerName] = useState('');
  const[brewery,setBrewery] = useState('');
  const[description, setDescription] = useState('');
  const[color,setColor] = useState('');
  const[aroma, setAroma] = useState('');
  const[bitter,setBitter] = useState('');
  const[flavor, setFlavor] = useState('');
  const[rate, setRate] = useState('');
  const {currentUser} = useAuth();

  const handleBeerName = (event) =>{
    setBeerName(event.target.value)
  };
  const handleBrewery = (event) =>{
    setBrewery(event.target.value)
  };
  const handleDescription = (event) =>{
    setDescription(event.target.value)
  };
  const handleColor = (event) =>{
    setColor(event.target.value)
  };
  const handleAroma = (event) =>{
    setAroma(event.target.value)
  };
  const handleFlavor = (event) =>{
    setFlavor(event.target.value)
  };
  const handleBitter = (event) =>{
    setBitter(event.target.value)
  };
  const handleRate =(event) =>{
    setRate(event.target.value)
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
      await fetch(`https://form-with-img-test-default-rtdb.firebaseio.com/users/${currentUser.uid}/posts.json`,{
      method: 'POST',
      body: JSON.stringify({ 
        beerName: beerName,
        brewery: brewery,
        description: description,
        color: color,
        aroma: aroma,
        bitter: bitter,
        flavor: flavor,
        rate: rate,
        foto: imgUrl
      })
    })
  };
  
  return (
    <div className={isActive ?  classes.active : classes.addBeerForm}>
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
       <label>Description</label>
       <input type="text" onChange={event=>{handleDescription(event)}}></input>
       <label htmlFor="text">Color</label>
          <select placeholder="beer color" onChange={event=>{handleColor(event)}}>
            <option className="firstColor">Straw</option>
            <option className="secondColor">Yellow</option>
            <option className="thirdColor">Dark Gold</option>
            <option className="fourthColor">Sandy</option>
            <option className="fifthColor">Brown</option>
            <option className="sixthColor">Dark Brown</option>
            <option className="sevethColor">Black</option>
            <option>Inna</option>
          </select>
       <label>Aroma</label>
       <input type="text" onChange={event=>{handleAroma(event)}}></input> 
       <label>Flavor</label>
       <input type="text" onChange={event=>{handleFlavor(event)}}></input>    
       <label htmlFor="quantity">Bitter</label>
       <input type="number" id="quantity" name="quantity" min="1" max="10" onChange={event=>{handleBitter(event)}}></input>   
       <label htmlFor="quantity">Rate</label>
       <input type="number" id="quantity" name="quantity" min="1" max="100"  onChange={event=>{handleRate(event)}}></input>
       <button>Submit</button>
     </form>
    </div>
  );
};
export default BeerForm;
