import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import { setAccessToken } from "./redux/actions/auth";
import { logout as logoutAction } from "./redux/actions/session";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { publicRoutes } from "./routes/publicRoutes";
import { normalizeAuth0User } from "./utils/normalizeAuth0User";
import NotFound from "components/commons/not-found/NotFound";
import Layout from "./components/layout/Layout";
import EmailModal from "components/commons/modal/EmailModal";
import {
  fetchAuth0User,
  postUser,
  setUserState,
} from "./redux/actions/userActions";
import { isTokenValid } from "utils/auth";

export default function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isWaitingEmail, setIsWaitingEmail] = useState(false);
  const [pendingAuth0User, setPendingAuth0User] = useState(null);
  const reduxUser = useSelector((state) => state.user);

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

  const handleUserFlow = useCallback(
    async (normalizedUser) => {
      try {
        // Try to find the user if exists
        const userDb = await dispatch(fetchAuth0User(normalizedUser.auth0Sub));
        setUser(userDb);
      } catch {
        // User not exist. Create.
        const userDb = await dispatch(postUser(normalizedUser));
        setUser(userDb);
        localStorage.setItem("loggedUser", JSON.stringify(userDb));
      } finally {
        setIsUserLoading(false);
      }

      // Token
      try {
        const token = await getAccessTokenSilently();
        dispatch(setAccessToken(token));
        localStorage.setItem("token", token);
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch, getAccessTokenSilently]
  );

  useEffect(() => {
    if (reduxUser && Object.keys(reduxUser).length > 0) {
      setUser(reduxUser);
    } else {
      setUser(null);
    }
  }, [reduxUser]);

  useEffect(() => {
    const initFromStorage = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("loggedUser"));

      if (storedToken) {
        try {
          if (isTokenValid(storedToken)) {
            dispatch(setAccessToken(storedToken));
          } else {
            dispatch(logoutAction());
            return;
          }
        } catch (error) {
          console.error("Invalid token in storage: ", error);
          dispatch(logoutAction());
          return;
        }
        dispatch(setAccessToken(storedToken));
      }

      if (storedUser) {
        setUser(storedUser);
        dispatch(setUserState(storedUser));
        setIsUserLoading(false);
      } else {
        setIsUserLoading(true);
      }
    };

    initFromStorage();
  }, [dispatch]);

  useEffect(() => {
    if (user) return;
    if (!auth0User) {
      setIsUserLoading(false);
      return;
    }

    const checkOrAskEmail = async () => {
      try {
        const existing = await dispatch(fetchAuth0User(auth0User.sub));
        if (existing.email) {
          const normalized = normalizeAuth0User({
            ...auth0User,
            email: existing.email,
          });
          return handleUserFlow(normalized);
        }
        setPendingAuth0User(auth0User);
        setIsWaitingEmail(true);
      } catch {
        setPendingAuth0User(auth0User);
        setIsWaitingEmail(true);
      }
    };

    checkOrAskEmail();
  }, [auth0User, user, dispatch, handleUserFlow]);

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
      <EmailModal
        isOpen={isWaitingEmail}
        onClose={() => {
          setIsWaitingEmail(false);
          setPendingAuth0User(null);
        }}
        onSave={async (email) => {
          try {
            const completeUser = { ...pendingAuth0User, email };
            const normalizedUser = normalizeAuth0User(completeUser);
            await handleUserFlow(normalizedUser);
            setPendingAuth0User(null);
            setIsWaitingEmail(false);
          } catch (error) {
            console.error("No se pudo completar el registro: ", error);
          }
        }}
      />
      <Routes>
        <Route element={<Layout {...routeProps} />}>
          {[
            ...authRoutes(routeProps),
            ...userRoutes(routeProps),
            ...adminRoutes(routeProps),
            ...publicRoutes(routeProps),
          ].map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element}>
              {route.children?.map((child, cidx) => (
                <Route
                  key={`${idx}-${cidx}`}
                  path={child.path}
                  index={child.index}
                  element={child.element}
                />
              ))}
            </Route>
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
