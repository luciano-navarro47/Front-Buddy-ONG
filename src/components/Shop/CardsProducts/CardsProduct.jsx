import React from "react";
import CardProduct from "./CardProduct.jsx";

export default function CardsProduct({
  products,
  handlerSetCart,
  handleRemoveItemCart,
}) {
  return products.map((el, idx) => (
    <CardProduct
      key={idx}
      handlerSetCart={handlerSetCart}
      handleRemoveItemCart={handleRemoveItemCart}
      name={el.name}
      id={el.id}
      images={el.images}
      stock={el.stock}
      description={el.description}
      price={el.price}
    ></CardProduct>
  ));
}
