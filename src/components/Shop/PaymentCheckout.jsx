
import React, { useEffect } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { useToast } from "@chakra-ui/react";


export default function PaymentCheckout({ preferenceId, amount }) {

  
  const toast = useToast()

  useEffect(() => {
    initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY, { locale: "es-AR" });
  }, []);

  const initialization = {
    amount,
    preferenceId, 
  };

  // TO DO: create process-payment route in backend to manage PagoFacil and Rapipago. Use "ticket: all paymentMethods
  // TO DO: create process-payment route in backend to manage PagoFacil and Rapipago. Use "ticket: all paymentMethods

  const customization = {
    paymentMethods: {
      // ticket: "all", 
      // prepaidCard: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };

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
          toast({
            title: "Ups!",
            description: "Ocurrió un error al momento de iniciar el proceso de pago.",
            isClosable: true,
            duration: 5000,
            status: "error"
          })
          reject();
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
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  );
}
