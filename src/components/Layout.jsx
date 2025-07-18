import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export const Layout = (props) => {
  return (
    <>
      <Navbar {...props} />
      <Outlet />
      <Footer />
    </>
  );
};
