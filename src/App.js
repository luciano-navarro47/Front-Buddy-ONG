import "./App.css";
import {
  isNotLogged,
  isBanned,
  isUser,
  isAdm,
} from "./utils/functionsApp/functionsApp";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

function App() {
  // const loggedUser = localStorage.getItem("loggedUser");
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [userFlag, setUserFlag] = useState(false);
  const [usuario, setUsuario] = useState("");

  console.log("USER IN APP: ", usuario);

  function handleSetUserFlag() {
    if (userFlag) {
      setUserFlag(false);
    } else {
      setUserFlag(true);
    }
  }

  useEffect(() => {
    const validator = async () => {
      const isVerify = await getAccessTokenSilently();
      setToken(isVerify);
    };
    validator();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    setUsuario(storedUser || []);
  }, [userFlag]);

  useEffect(() => {
  }, [userFlag, usuario]);

  if (usuario[0]?.status === "banned") {
    return isBanned();
  }
  if (usuario[0] === undefined) {
    return isNotLogged(handleSetUserFlag, setUsuario);
  }
  if (usuario[0]?.role === "admin") {
    return isAdm(handleSetUserFlag, setUsuario, usuario[0], token);
  }
  if (usuario[0]?.role === "user") {
    return isUser(handleSetUserFlag, setUsuario, usuario[0], token);
  }
}

export default App;
