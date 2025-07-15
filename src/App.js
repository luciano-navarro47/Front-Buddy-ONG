import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import { setAccessToken } from "./redux/Actions/auth";
import { logout as logoutAction } from "./redux/Actions/session";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { publicRoutes } from "./routes/publicRoutes";
import { normalizeAuth0User } from "./utils/normalizeAuth0User";
import NotFound from "./components/NotFound/NotFound";
import { Layout } from "./components/Layout";
import EmailFallBackModal from "./components/Modal/EmailFallbackModal";
import {
  fetchAuth0User,
  postUser,
  setUserState,
} from "./redux/Actions/userActions";

export const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isWaitingEmail, setIsWaitingEmail] = useState(false);
  const [pendingAuth0User, setPendingAuth0User] = useState(null);

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

  const handleUserFlow = (normalizedUser) => {
    dispatch(fetchAuth0User(normalizedUser.auth0Sub))
      .then((userDb) => {
        // User already exists.
        setUser(userDb);
        localStorage.setItem("loggedUser", JSON.stringify(userDb));
      })
      .catch(() => {
        // User not exist. Create.
        dispatch(postUser(normalizedUser))
          .then((userDb) => {
            setUser(userDb);
            localStorage.setItem("loggedUser", JSON.stringify(userDb));
          })
          .catch((err) => {
            console.error("Error saving OAuth user:", err);
          });
      })
      .finally(() => {
        setIsUserLoading(false);
      });

    getAccessTokenSilently()
      .then((token) => {
        dispatch(setAccessToken(token));
        localStorage.setItem("token", token);
      })
      .catch(console.error);
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
      return;
    }

    if (auth0User) {
      if (!auth0User.email) {
        setPendingAuth0User(auth0User);
        setIsWaitingEmail(true);
        return;
      }

      const normalizedUser = normalizeAuth0User(auth0User);
      handleUserFlow(normalizedUser);
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
    <>
      <EmailFallBackModal
        isOpen={isWaitingEmail}
        onClose={() => setIsWaitingEmail(false)}
        onSave={(email) => {
          const completeUser = {
            ...pendingAuth0User,
            email,
          };

          const normalizedUser = normalizeAuth0User(completeUser);
          handleUserFlow(normalizedUser);
          setPendingAuth0User(null);
          setIsWaitingEmail(false);
        }}
      />
      <Routes>
        <Route element={<Layout {...routeProps} />}>
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
    </>
  );
};

export default App;
