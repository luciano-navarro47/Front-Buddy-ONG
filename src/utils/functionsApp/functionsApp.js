import { Route, Routes, Navigate } from "react-router-dom";

import AboutUs from "../../Componets/AboutUs/AboutUs";
import Banned from "../../Componets/Banned/Banned";
import Cart from "../../Componets/Shop/Cart/Cart";
import CreateUserAuth0 from "../../Componets/CreateUserAuth0/CreateUserAuth0";
import DashboardAdmin from "../../Componets/DashboardAdmin/DashboardAdmin/DashboardAdmin";
import Details from "../../Componets/Details/Details";
import Donation from "../../Componets/Donation/Donation";
import FormAffiliateVets from "../../Componets/DashboardAdmin/Dashboard/FormAffiliateVets";
import FormPostProduct from "../../Componets/DashboardAdmin/Dashboard/FormPostProduct";
import FormPostPet from "../../Componets/FormPostPet/FormPostPet";
import FormPostUser from "../../Componets/FormPostUser/FormPostUser";
import Home from "../../Componets/Home/Home";
import LandingPage from "../../Componets/LandingPage/LandingPage";
import NotFound from "../../Componets/NotFound/NotFound";
import Pets from "../../Componets/Adoption/Pets";
import ProductDetail from "../../Componets/Shop/ProductDetail/ProductDetail";
import Shop from "../../Componets/Shop/Shop";
import Veterinaries from "../../Componets/Veterinaries/Veterinaries";
import VetsDetails from "../../Componets/VetsDetail/VetsDetail";
import { MyPets } from "../../Componets/MyPets/MyPets";

export function isNotLogged(handleSetUserFlag, setUsuario) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          exact
          path="/login"
          element={<LandingPage handleSetUserFlag={handleSetUserFlag} />}
        />
        <Route
          exact
          path="/home"
          element={
            <Home
              setUsuario2={setUsuario}
              handleSetUserFlag={handleSetUserFlag}
            />
          }
        ></Route>
        <Route
          exact
          path="/donate"
          element={<Donation handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/veterinary"
          element={<Veterinaries handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/aboutUs"
          element={
            <AboutUs
              setUsuario={setUsuario}
              handleSetUserFlag={handleSetUserFlag}
            />
          }
        ></Route>
        <Route
          exact
          path="/adoptions"
          element={
            <Pets handleSetUserFlag={handleSetUserFlag} value={"adoptions"} />
          }
        ></Route>
        <Route
          exact
          path="/lostPets"
          element={
            <Pets handleSetUserFlag={handleSetUserFlag} value={"lostPets"} />
          }
        ></Route>
        <Route
          path="*"
          element={<NotFound handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route exact path="/createUser" element={<FormPostUser />}></Route>
        <Route
          exact
          path="/shop"
          element={<Shop handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          path="/shop/product/:productId"
          element={<ProductDetail handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/shop/cart"
          element={<Cart handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
      </Routes>
    </div>
  );
}

export function isBanned() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/banned" element={<Banned />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export function isUser(handleSetUserFlag, setUsuario, usuario, token) {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/home"
          element={
            <Home
              setUsuario2={setUsuario}
              handleSetUserFlag={handleSetUserFlag}
            />
          }
        ></Route>
        <Route
          exact
          path="/donate"
          element={<Donation handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/createPet"
          element={
            <FormPostPet handleSetUserFlag={handleSetUserFlag} token={token} />
          }
        ></Route>
        <Route
          exact
          path="/updatePet/:id"
          element={
            <FormPostPet
              handleSetUserFlag={handleSetUserFlag}
              token={token}
              value={"update"}
            />
          }
        ></Route>
        {/* <Route exact path="/createAuth0" element={<CreateUserAuth0 />}></Route> */}
        <Route
          exact
          path="/login"
          element={<LandingPage handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route exact path="/createUser" element={<FormPostUser />}></Route>
        <Route
          exact
          path="/updateUser"
          element={<FormPostUser id={usuario.id} value={"update"} />}
        ></Route>
        <Route
          exact
          path="/shop"
          element={<Shop handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          path="/shop/product/:productId"
          element={<ProductDetail handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/shop/cart"
          element={<Cart handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/aboutUs"
          element={<AboutUs handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/pets/:paramsId"
          element={<Details handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/adoptions"
          element={
            <Pets handleSetUserFlag={handleSetUserFlag} value={"adoptions"} />
          }
        ></Route>
        <Route
          exact
          path="/lostPets"
          element={
            <Pets handleSetUserFlag={handleSetUserFlag} value={"lostPets"} />
          }
        ></Route>
        <Route
          exact
          path="/myPets"
          element={<MyPets handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/veterinary"
          element={<Veterinaries handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/veterinary/:paramsId"
          element={<VetsDetails handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/dashboard/createProduct"
          element={<FormPostProduct />}
        ></Route>
        <Route
          exact
          path="/dashboard/createVet"
          element={<FormAffiliateVets />}
        ></Route>
        <Route
          exact
          path="/dashboard/updateVet/:id"
          element={<FormAffiliateVets value={"updateVet"} />}
        ></Route>
        <Route
          exact
          path="/dashboard/updateProduct"
          element={<FormPostProduct />}
        ></Route>
        <Route
          path="*"
          element={<NotFound handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
      </Routes>
    </div>
  );
}

export function isAdm(handleSetUserFlag, setUsuario, usuario, token) {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<LandingPage handleSetUserFlag={handleSetUserFlag} />}
        ></Route>

        <Route
          exact
          path="/shop"
          element={<Shop handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          path="/shop/product/:productId"
          element={<ProductDetail handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route exact path="/shop/cart" element={<Cart />}></Route>
        <Route
          exact
          path="/dashboard"
          element={<DashboardAdmin token={token} />}
        ></Route>
        <Route
          exact
          path="/donate"
          element={<Donation handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/createPet"
          element={
            <FormPostPet handleSetUserFlag={handleSetUserFlag} token={token} />
          }
        ></Route>
        <Route
          exact
          path="/updatePet/:id"
          element={
            <FormPostPet
              handleSetUserFlag={handleSetUserFlag}
              token={token}
              value={"update"}
            />
          }
        ></Route>
        <Route exact path="/createAuth0" element={<CreateUserAuth0 />}></Route>
        <Route exact path="/createUser" element={<FormPostUser />}></Route>
        <Route
          exact
          path="/updateUser"
          element={<FormPostUser id={usuario.id} value={"update"} />}
        ></Route>
        <Route
          exact
          path="/updateUser"
          element={<FormPostUser value={"update"} />}
        ></Route>
        <Route
          exact
          path="/home"
          element={
            <Home
              setUsuario2={setUsuario}
              handleSetUserFlag={handleSetUserFlag}
            />
          }
        ></Route>
        <Route
          exact
          path="/aboutUs"
          element={<AboutUs handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/pets/:paramsId"
          element={<Details handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/adoptions"
          element={
            <Pets handleSetUserFlag={handleSetUserFlag} value={"adoptions"} />
          }
        ></Route>
        <Route
          exact
          path="/lostPets"
          element={
            <Pets handleSetUserFlag={handleSetUserFlag} value={"lostPets"} />
          }
        ></Route>
        <Route
          exact
          path="/myPets"
          element={<MyPets handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/veterinary"
          element={<Veterinaries handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/veterinary/:paramsId"
          element={<VetsDetails handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
        <Route
          exact
          path="/dashboard/createProduct"
          element={<FormPostProduct />}
        ></Route>
        <Route
          exact
          path="/dashboard/createVet"
          element={<FormAffiliateVets />}
        ></Route>
        <Route
          exact
          path="/dashboard/updateVet/:id"
          element={<FormAffiliateVets value={"updateVet"} />}
        ></Route>
        <Route
          exact
          path="/dashboard/updateProduct/:id"
          element={<FormPostProduct value={"updateProduct"} />}
        ></Route>
        <Route
          path="*"
          element={<NotFound handleSetUserFlag={handleSetUserFlag} />}
        ></Route>
      </Routes>
    </div>
  );
}
