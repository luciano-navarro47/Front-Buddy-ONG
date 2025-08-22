import React, { useEffect, useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { postOrUpdateProduct } from "redux/Actions/productActions";

function PriceCell({ row }) {
  const dispatch = useDispatch();

  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [price, setPrice] = useState(Math.round(row.price));
  const [originalPrice, setOriginalPrice] = useState(Math.round(row.price));

  useEffect(() => {
    const incoming = Math.round(row.price);
    setOriginalPrice(incoming);

    if (status !== "loading") {
      setPrice(incoming);
    }
  }, [row.price, row.id, status]);

  const handleBlur = async () => {
    if (price !== originalPrice) {
      try {
        setStatus("loading");
        await dispatch(postOrUpdateProduct({ ...row, price }, price, row.id));
        setStatus("success");

        setTimeout(() => setStatus("idle"), 1000);
      } catch (error) {
        setStatus("idle");
        console.error(error);
      }
    }
  };

  return (
    <InputGroup size="sm">
      <InputLeftElement pointerEvents="none" fontSize="xs" w="1.5rem">
        $
      </InputLeftElement>
      <Input
        type="number"
        value={price}
        onBlur={handleBlur}
        onChange={(e) => setPrice(Number(e.target.value))}
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
