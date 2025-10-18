// src/components/PaymentCheckout.jsx
import React, { useEffect } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";

export default function PaymentCheckout({ preferenceId, amount }) {
    console.log("ENTRE AL COMP PAYCHECK ")
  useEffect(() => {
    initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY, { locale: "es-AR" });
  }, []);

  const initialization = {
    amount,
    preferenceId, // viene del backend
  };

  const customization = {
    paymentMethods: {
      ticket: "all",
      creditCard: "all",
      prepaidCard: "all",
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
