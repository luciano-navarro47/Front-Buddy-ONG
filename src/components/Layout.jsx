import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export const Layout = (props) => {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/account");

  return (
    <>
      {!hideLayout && <Navbar {...props} />}
      <Outlet />
      {!hideLayout && <Footer />}
    </>
  );
};
