import React, { useEffect } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { Box, useToast } from "@chakra-ui/react";

export default function PaymentCheckout({ preferenceId, amount }) {
  const toast = useToast();

  useEffect(() => {
    initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY, { locale: "es-AR" });
  }, [preferenceId]);

  const initialization = {
    amount,
    preferenceId,
  };

  const customization = {
    paymentMethods: {
      // ticket: "all",
      // prepaidCard: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };

  // TO DO: create process-payment flow in backend to manage PagoFacil and Rapipago. Use "ticket: all paymentMethods
  // TO DO: create process-payment flow in backend to manage PagoFacil and Rapipago. Use "ticket: all paymentMethods

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    return new Promise((resolve, reject) => {
      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("Pago procesado:", res);
          resolve();
        })
        .catch((error) => {
          reject();
          toast({
            title: "Ups!",
            description:
              "Ocurrió un error al momento de iniciar el proceso de pago.",
            isClosable: true,
            duration: 5000,
            status: "error",
            position: "top-right",
          });
        });
    });
  };

  const onError = (error) => {
    console.error("Error en Brick:", error);
  };

  const onReady = () => {
    console.log("Payment Brick listo");
  };

  return (
    <Box
      p={0}
      m={0}
      width="100%"
      sx={{
        "form[class*='mp-checkout-bricks']": {
          padding: "0 !important",
        },
      }}
    >
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </Box>
  );
}
