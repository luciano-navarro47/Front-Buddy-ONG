import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

export default function Layout(props) {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/account");

  return (
    <>
      {!hideLayout && <Navbar {...props} />}
      <Outlet />
      {!hideLayout && <Footer />}
    </>
  );
}
