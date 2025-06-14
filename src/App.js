import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { setAccessToken } from "./redux/Actions/auth";
import { fetchAuth0User, postUser } from "./redux/Actions/userActions";
import { normalizeAuth0User } from "./utils/normalizeAuth0User";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import NotFound from "./components/NotFound/NotFound";

// import Home from "./components/Home/Home";
// import FormPostPet from "./components/FormPostPet/FormPostPet";
// import DashboardAdmin from "./components/DashboardAdmin/DashboardAdmin/DashboardAdmin";
// import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
// import LandingPage from "./components/LandingPage/LandingPage";

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
      logout({ returnTo: window.location.origin + "/" });
    }
    setUser(null);
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("alreadyUpserted");
    navigate("/");
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser) {
      setUser(storedUser);
      setIsUserLoading(false);
    } else if (auth0User) {
      const normalizedUser = normalizeAuth0User(auth0User);
      let userExists;
      dispatch(fetchAuth0User(normalizedUser.auth0Sub))
        .then((userDb) => {
          setUser(userDb);
          userExists = true;
          localStorage.setItem("loggedUser", JSON.stringify(userDb));
        })
        .catch((err) => console.error("Error fetching oauth user: ", err))
        .finally(() => setIsUserLoading(false));

      if (!userExists) {
        dispatch(postUser(normalizedUser))
          .then((userDb) => {
            setUser(userDb);
            localStorage.setItem("loggedUser", JSON.stringify(userDb));
            localStorage.setItem("alreadyUpserted", "true");
          })
          .catch((err) => {
            console.error("Error saving OAuth user: ", err);
          })
          .finally(() => {
            setIsUserLoading(false);
          });
      }

      getAccessTokenSilently()
        .then((token) => setAccessToken(token))
        .catch(console.error);
    } else {
      setIsUserLoading(false);
    }
  }, [auth0User, dispatch, getAccessTokenSilently]);

  if (isLoading || isUserLoading) return <div> Cargando usuario...</div>;
  if (user?.status === "banned") return <p>User was banned from the app</p>;

  const routeProps = {
    user,
    setUser,
    closeSession,
    isAuthenticated,
    loginWithRedirect,
  };

  return (
    <Routes>
      {[...authRoutes(routeProps), ...userRoutes(routeProps)].map(({ path, element }, idx) => (
        <Route key={idx} path={path} element={element} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
