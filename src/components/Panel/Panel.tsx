import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc} from "firebase/firestore";
import { app } from "../../main";
import React, {useState} from "react"
import Logo from "../../assets/robot.png"
import Button from "../Button/Button"
import Input from "../Input/Input"
import "./Panel.css"

export default function Panel({setLoggedIn}:{setLoggedIn: (isLoggedIn: boolean) => void}){

  const [getEvName,setEvName] = useState("");
  const [getAddress, setAddress] = useState("");
  const [getCity, setCity] = useState("");
  const [getPostCode, setPostCode] = useState("");
  const [getProvince, setProvince] = useState("");
  const [getImg, setImg] = useState(new File([""], "",undefined));
  const [filename, setFilename] = useState("");
  const [mess, setMessage] = useState("");
  const logOut = () =>{
    document.cookie = "loggedIn=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
    setLoggedIn(false);
    window.location.reload(); // if reopened before cookie expires
  }

  const dataHandler = (e: React.FormEvent<HTMLInputElement>) =>{
    const target = e.target as HTMLInputElement;
    switch (target.name){
      case "event_name":{
        if(target.value != "") setEvName(target.value);
        break;
      }
      case "address":{
        if(target.value != "") setAddress(target.value);
        break;
      }
      case "city":{
        if(target.value != "") setCity(target.value);
        break;
      }
      case "postal_code":{
        /^\d{2}-\d{3}$/.test(target.value) ? setPostCode(target.value) : setPostCode("");
        break;
      }
      case "province":{
        if(target.value != "") setProvince(target.value);
        break;
      }
      case "image":{
        if(target.files && target.files.length !== 0){
          setFilename(`images/${Date.now()}.${target.files[0].type.split('/')[1]}`)
          setImg(target.files[0]);
        }
      }
    }
  }

  const sendToDB =  () =>{
    if([getEvName, getAddress, getCity, getProvince].includes("")){
      setMessage("One or more fields are empty");
      return
    }
    else if(getPostCode == ""){
      setMessage("The post code doesn't fit the pattern XX-XXX");
      return
    }
    else if(getImg.name == ""){
      setMessage("The image for the event has not been provided");
      return
    }
    setMessage("");
    const db = getFirestore(app);
    addDoc(collection(db, "events"),{
      eventName: getEvName,
      address: getAddress,
      city: getCity,
      postCode: getPostCode,
      province: getProvince,
      img: filename
    })
    .then((docRef)=>{
      console.log("Added a doc to events with id: " + docRef.id)
    })

    const storage = getStorage(app);
    const storageRef = ref(storage, filename);
    if(getImg.name != ""){
      uploadBytes(storageRef, getImg).then(()=> {
        console.log('Uploaded a blob or file!');
      });
    }

    setMessage("Successfully added the event!")
  }
  const inputLabels: string[] = ["Event Name", "Address", "City", "Postal Code", "Province"];
  const elements: JSX.Element[] = inputLabels.map(l =>  <Input key={l} name={l.toLowerCase().replace(" ", "_")} label={l} inputHandler = {dataHandler}/>);

  return (
    <>
      <nav className="panel-nav">
        <img src={Logo} alt="logo-robot" className="nav-logo"/>
        <Button text="Log out" clickHandler={logOut}/>
      </nav>
      <div className="panel">
        {elements}
        <Input type="file" label="Image" name="image" inputHandler={dataHandler} accept="image/*"/>
        <Button text="Add Event" clickHandler={sendToDB}/>
        <p>{mess}</p>
      </div>
    </>
  )
}
