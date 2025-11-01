import React, { useEffect, useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { postOrUpdateProduct } from "redux/actions/productActions";
import { formatPrice, parsePriceToNumber } from "utils/formatPrice";

function PriceCell({ row, userRole }) {
  const dispatch = useDispatch();
  const toast = useToast();

  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [price, setPrice] = useState(formatPrice(String(row.price ?? "")));
  const [originalPrice, setOriginalPrice] = useState(
    formatPrice(String(row.price ?? ""))
  );

  useEffect(() => {
    const incoming = formatPrice(String(row.price ?? ""));
    setOriginalPrice(incoming);

    if (status !== "loading") {
      setPrice(incoming);
    }
  }, [row.price, row.id, status]);

  const handleBlur = async () => {
    if (price === originalPrice) return;

    try {
      if (userRole !== "admin") {
        setPrice(originalPrice);
        return toast({
          title: "INFO",
          status: "info",
          description:
            "Modo demo-admin activado. No puedes cambiar el precio de los productos.",
          duration: 2000,
          isClosable: true,
        });
      }
      setStatus("loading");

      const numberPrice = parsePriceToNumber(price);
      await dispatch(
        postOrUpdateProduct(
          { ...row, price: numberPrice },
          "updateProduct",
          row.id
        )
      );

      const formatted = formatPrice(String(numberPrice));
      setPrice(formatted);
      setOriginalPrice(formatted);

      setStatus("success");
      setTimeout(() => setStatus("idle"), 1000);
    } catch (error) {
      console.error(error);
      setStatus("idle");
      setPrice(originalPrice);
    }
  };

  return (
    <InputGroup size="sm">
      <InputLeftElement pointerEvents="none" fontSize="xs" w="1.5rem">
        $
      </InputLeftElement>

      <Input
        type="text"
        value={price}
        onBlur={handleBlur}
        onFocus={() => {
          setPrice((prev) => (prev ? String(prev).replace(/\./g, "") : prev));
        }}
        onChange={(e) => {
          const v = e.target.value.replace(/[^\d,.]/g, "");
          setPrice(v);
        }}
        borderColor={status === "success" ? "green.400" : undefined}
        focusBorderColor={status === "loading" ? "orange.400" : "green.400"}
        pl="1.5rem"
        pr="1.5rem"
      />
      <InputRightElement w="1.5rem">
        {status === "loading" && <Spinner size="xs" />}
        {status === "success" && <CheckIcon color="green.500" />}
      </InputRightElement>
    </InputGroup>
  );
}

export default PriceCell;
