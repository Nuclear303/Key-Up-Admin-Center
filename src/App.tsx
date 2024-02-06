import { useState } from "react"
import Login from "./components/Login/Login";
import Panel from "./components/Panel/Panel";

/**
 * Checks if the user is logged in, if not, loads the Login form
 * @returns A JSX Component, either the Login form or the Admin Panel
 */

export default function App(){
  const [isLoggedIn, setLogIn] = useState(false);
  const comp = (isLoggedIn || document.cookie == "loggedIn=") ? <Panel setLoggedIn={setLogIn}/> : <Login setLoggedIn={setLogIn}/>
  console.log(document.cookie)
  return comp;
}
