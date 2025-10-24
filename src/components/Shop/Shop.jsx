import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Box, SimpleGrid, Center, Text, useToast } from "@chakra-ui/react";
import ShopNavbar from "./ShopNavbar/ShopNavbar";
import Pagination from "../Pagination/Pagination";
import CardsProduct from "./CardsProducts/CardsProduct";
import { getAllProducts } from "../../redux/Actions/productActions";

export default function Shop() {
  const dispatch = useDispatch();
  const toast = useToast()
  const products = useSelector((state) => state.products.filteredProducts);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [productsPerPage, setProductsPerPage] = useState(6);

  useEffect(() => {
    const sp = new URLSearchParams(searchParams);
    if (currentPage === 1) {
      sp.delete("page");
    } else {
      sp.set("page", String(currentPage));
    }
    setSearchParams(sp, { replace: true });
  }, [currentPage, searchParams, setSearchParams]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (number) => {
    if (number < 1) return;
    const totalPages = Math.ceil((products.length || 0) / productsPerPage) || 1;
    if (number > totalPages) return;
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

  const handleSetCart = (e, id, price, images, name, stock) => {
    e.preventDefault();

    try {
      const product = {
        id: String(id),
        name,
        unit_price: Number(price ?? 0),
        quantity: 1,
        stock: Number(stock ?? 0),
        picture_url: Array.isArray(images) ? images[0] : images,
        total: Number(price ?? 0),
      };

      const raw = window.localStorage.getItem("cart");
      const oldCart = raw ? JSON.parse(raw) : null;

      if (Array.isArray(oldCart) && oldCart.length > 0) {
        const index = oldCart.findIndex(
          (pr) => String(pr.id) === String(product.id)
        );

        if (index !== -1) {
          const existing = oldCart[index];
          const existingQty = Number(existing.quantity ?? existing.amount ?? 0);
          const existingUnitPrice = Number(
            existing.unit_price ?? existing.price ?? product.unit_price
          );

          if (existingQty >= (product.stock ?? 0)) {
            return toast({
              title: "Se llegó al limite de stock actual",
              isClosable: true,
              status: "warning"
            })
          }

          const newQty = existingQty + 1;
          oldCart[index] = {
            ...existing,
            quantity: newQty,
            unit_price: existingUnitPrice,
            total: Math.round(existingUnitPrice * newQty * 100) / 100,
            picture_url:
              existing.picture_url ??
              existing.images?.[0] ??
              product.picture_url,
            name: existing.name ?? product.name,
          };

          window.localStorage.setItem("cart", JSON.stringify(oldCart));
          dispatch(getAllProducts());
          return;
        }

        if (product.stock !== 0) {
          window.localStorage.setItem(
            "cart",
            JSON.stringify([...oldCart, product])
          );
          dispatch(getAllProducts());
          return;
        } else {
          return alert("El producto no tiene stock");
        }
      } else {
        if (product.stock !== 0) {
          window.localStorage.setItem("cart", JSON.stringify([product]));
          dispatch(getAllProducts());
          return;
        } else {
          return alert("El producto no tiene stock");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box minHeight={"80vh"} bg="brand.backgorund" paddingBottom={"3rem"}>
        <ShopNavbar
          handleSetCart={handleSetCart}
          handleRemoveItemCart={handleRemoveItemCart}
          paginate={paginate}
        />
        <Pagination
          itemsPerPage={productsPerPage}
          totalItems={products.length}
          currentPage={currentPage}
          onPageChange={(pageNum) => setCurrentPage(pageNum)}
        />
        <Center>
          <Box>
            <SimpleGrid columns={[1, 1, 2, 3]} w={"90vw"} spacing="40px">
              {products.length ? (
                <CardsProduct
                  products={currentProducts}
                  handleSetCart={handleSetCart}
                  handleRemoveItemCart={handleRemoveItemCart}
                  currentPage={currentPage}
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

        <Pagination
          itemsPerPage={productsPerPage}
          totalItems={products.length}
          currentPage={currentPage}
          onPageChange={(pageNum) => setCurrentPage(pageNum)}
        />
      </Box>
    </>
  );
}
