import "./App.css";
import {
  isBanned,
  isUser,
  isAdm,
} from "./utils/functionsApp/functionsApp";
import { useState, useEffect } from "react";

function App() {
  const [userFlag, setUserFlag] = useState(false);
  const [user, setUser] = useState({});


  function handleSetUserFlag() {
    setUserFlag((prev) => !prev);
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if(storedUser){
      setUser(storedUser);
    }
  }, [userFlag]);

  if(!user) {
    return <p>Cargando usuario...</p>;
  }

  if (user.status === "banned") {
    return isBanned();
  }
  
  if (user.role === "admin") {
    return isAdm(handleSetUserFlag, setUser, user);
  }
  
  return isUser(handleSetUserFlag, setUser, user);
}

export default App;
