
import React, { useEffect } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";

export default function PaymentCheckout({ preferenceId, amount }) {
  useEffect(() => {
    initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY, { locale: "es-AR" });
  }, []);

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

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    console.log("FORMDATA: ", formData)
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
          console.error("Error al procesar pago:", error);
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
