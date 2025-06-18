  import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import { setAccessToken } from "./redux/Actions/auth";
import {
  fetchAuth0User,
  postUser,
  setUserState,
} from "./redux/Actions/userActions";
import { logout as logoutAction } from "./redux/Actions/session";
import NotFound from "./components/NotFound/NotFound";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { publicRoutes } from "./routes/publicRoutes";
import { normalizeAuth0User } from "./utils/normalizeAuth0User";
import { Layout } from "./components/Layout";

export const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const {
    isLoading,
    isAuthenticated,
    user: auth0User,
    getAccessTokenSilently,
    logout: auth0Logout,
    loginWithRedirect,
  } = useAuth0();

  const handleLogout = () => {
    dispatch(logoutAction(auth0Logout));
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(setAccessToken(storedToken));
    }
    if (storedUser) {
      setUser(storedUser);
      dispatch(setUserState(storedUser));
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
        .then((token) => {
          dispatch(setAccessToken(token));
          localStorage.setItem("token", token);
        })
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
    isAuthenticated,
    loginWithRedirect,
    handleLogout,
  };

  return (
    <Routes>
      <Route element={<Layout />}>
      {[
        ...authRoutes(routeProps),
        ...userRoutes(routeProps),
        ...adminRoutes(routeProps),
        ...publicRoutes(routeProps),
      ].map(({ path, element }, idx) => (
        <Route key={idx} path={path} element={element} />
      ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
