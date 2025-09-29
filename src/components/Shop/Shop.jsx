import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/Actions/productActions";

import CardsProduct from "./CardsProducts/CardsProduct";
import ShopNavbar from "./ShopNavbar/ShopNavbar";
import { Box, SimpleGrid, Center, Text } from "@chakra-ui/react";
import Pagination from "../Pagination/Pagination";

export default function Shop() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);
  console.log("PROD: ", products)

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (number) => {
    setCurrentPage(number);
  };

  function handleRemoveItemCart(e, id) {
    e.preventDefault();
    try {
      let currentCart = JSON.parse(window.localStorage.getItem("cart"));
      let flag = false;
      let index;
      currentCart.forEach((pr, i) => {
        if (pr.id === id) {
          flag = true;
          index = i;
        }
      });

      if (flag) {
        if (currentCart[index].amount === 1) {
          if (index === 0) {
            currentCart.shift();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlerSetCart = (e, id, price, image, name, stock) => {
    e.preventDefault();

    try {
      let product = {
        name,
        image,
        price,
        id,
        stock,
        amount: 1,
      };
      let oldCart = JSON.parse(window.localStorage.getItem("cart"));

      if (oldCart) {
        let index = false;
        oldCart.forEach((pr, i) => {
          if (pr.id === product.id) {
            index = i;
          }
        });
        if (index !== false) {
          if (stock === oldCart[index].amount) {
            return alert("Se llegó al limite de stock actual");
          } else {
            oldCart[index].amount += 1;

            oldCart[index].total = oldCart[index].price * oldCart[index].amount;
            window.localStorage.setItem("cart", JSON.stringify([...oldCart]));
            dispatch(getAllProducts);
            console.log(
              "CASO SI EXISTE CARRITO Y SIIIII TENGO INDEX",
              JSON.parse(localStorage.getItem("cart"))
            );
          }
        } else {
          if (stock !== 0) {
            product.total = product.price;
            window.localStorage.setItem(
              "cart",
              JSON.stringify([...oldCart, product])
            );
            dispatch(getAllProducts);
            console.log(
              "CASO SI EXISTE CARRITO Y NOOOOO TENGO INDEX",
              JSON.parse(localStorage.getItem("cart"))
            );
          } else {
            return alert("El producto no tiene stock");
          }
        }
      } else {
        if (stock !== 0) {
          product.total = product.price;
          window.localStorage.setItem("cart", JSON.stringify([product]));
          dispatch(getAllProducts);
          console.log(
            "CASO NO EXISTE CARRITO",
            JSON.parse(localStorage.getItem("cart"))
          );
        } else {
          return alert("El producto no tiene stock");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <>
      <Box minHeight={"80vh"} bg="brand.backgorund" paddingBottom={"3rem"}>
        <ShopNavbar
          handlerSetCart={handlerSetCart}
          handleRemoveItemCart={handleRemoveItemCart}
          paginate={paginate}
        />
        <Pagination
          petsPerPage={productsPerPage}
          allPets={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <Center>
          <Box>
            <SimpleGrid columns={[1, 1, 2, 3]} w={"90vw"} spacing="40px">
              {products.length ? (
                <CardsProduct
                  products={currentProducts}
                  handlerSetCart={handlerSetCart}
                  handleRemoveItemCart={handleRemoveItemCart}
                />
              ) : (
                <Center w={"99vw"} display={"flex"} alignItems={"center"}>
                  <Text
                    fontSize={"4xl"}
                    py={10}
                    fontWeight={"bold"}
                    color={"brand.darkBlue"}
                    fontFamily={"heading"}
                  >
                    No se econtraron productos
                  </Text>
                </Center>
              )}
            </SimpleGrid>
          </Box>
        </Center>
      </Box>
    </>
  );
}
