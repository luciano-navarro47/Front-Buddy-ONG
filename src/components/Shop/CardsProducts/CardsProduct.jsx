import React from "react";
import CardProduct from "./CardProduct.jsx";

export default function CardsProduct({
  products,
  handleSetCart,
  handleRemoveItemCart,
  currentPage,
}) {
  return products.map((el, idx) => (
    <CardProduct
      key={idx}
      handleSetCart={handleSetCart}
      handleRemoveItemCart={handleRemoveItemCart}
      currentPage={currentPage}
      name={el.name}
      id={el.id}
      images={el.images}
      stock={el.stock}
      description={el.description}
      price={el.price}
    ></CardProduct>
  ));
}
