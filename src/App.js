import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { setAccessToken } from "./Redux/Actions/auth";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./Componets/Home/Home";
import FormPostPet from "./Componets/FormPostPet/FormPostPet"
import DashboardAdmin from "./Componets/DashboardAdmin/DashboardAdmin/DashboardAdmin";
import NotFound from "./Componets/NotFound/NotFound";
import { isBanned } from "./utils/functionsApp/functionsApp";
import { PrivateRoute } from "./Componets/PrivateRoute/PrivateRoute";
import LandingPage from "./Componets/LandingPage/LandingPage";

export const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const {
    isLoading,
    isAuthenticated,
    user: auth0User,
    getAccessTokenSilently,
    logout,
    loginWithRedirect,
  } = useAuth0();

  const closeSession = () => {
    if (auth0User) {
      logout({ returnTo: window.location.origin + "/home" });
    }
    setUser(null);
    localStorage.removeItem("loggedUser");
    navigate("/home");
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser) {
      setUser(storedUser);
      setIsUserLoading(false);
    } else if (auth0User) {
      setUser(auth0User);
      localStorage.setItem("loggedUser", JSON.stringify(auth0User));
      (async () => {
        try {
          const token = await getAccessTokenSilently();
          if (token) {
            dispatch(setAccessToken(token));
          }
        } catch (error) {
          console.error("Error getting token: ", error);
        } finally {
          setIsUserLoading(false);
        }
      })();
    } else {
      setIsUserLoading(false);
    }
  }, [auth0User, dispatch, getAccessTokenSilently]);

  if (isLoading || isUserLoading) return <div> Cargando usuario...</div>;
  if (user?.status === "banned") return isBanned();

  return (
    <Routes>
      {/* Pública */}
      <Route
        path="/home"
        element={
          <Home
            user={user}
            setUser={setUser}
            closeSession={closeSession}
            isAuthenticated={isAuthenticated}
          />
        }
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          <LandingPage
            user={user}
            setUser={setUser}
            closeSession={closeSession}
            isAuthenticated={isAuthenticated}
            loginWithRedirect={loginWithRedirect}
          />
        }
      />

      {/* Admins */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute isAllowed={user?.role === "admin"} redirectPath="/home">
            <DashboardAdmin />
          </PrivateRoute>
        }
      />

      {/* Registered Users */}
      <Route path="/createPet" element={
        <PrivateRoute isAllowed={!!user} redirectPath="/login">
          <FormPostPet />
        </PrivateRoute>
      
      }/>

      {/* fallbacks */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
