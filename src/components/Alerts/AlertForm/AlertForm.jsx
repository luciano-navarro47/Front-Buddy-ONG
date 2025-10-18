import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
} from "@chakra-ui/react";

function AlertForm({
  status = "info",
  title = "",
  description = "",
  setShowAlert,
  onClose,
}) {
  const handleClose = () => {
    console.log("ENTRE")
    if (typeof setShowAlert === "function") setShowAlert(false);
    if (typeof onClose === "function") onClose();
  };

  return (
    <Box mb={4} position="relative">
      <Alert
        status={status}
        height="auto"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        borderRadius="md"
        py={4}
        px={4}
      >
        <AlertIcon boxSize={6} />
        <Box textAlign="left" ml={2}>
          {title ? (
            <AlertTitle display="block" fontWeight="bold">
              {title}
            </AlertTitle>
          ) : null}
          {description ? (
            <AlertDescription display="block">{description}</AlertDescription>
          ) : null}
        </Box>

        {(typeof setShowAlert === "function" ||
          typeof onClose === "function") && (
          <Box position="absolute" right={2} top={2}>
            <CloseButton onClick={handleClose} />
          </Box>
        )}
      </Alert>
    </Box>
  );
}
function ErrorForm({ setShowAlert, onClose } = {}) {
  return (
    <AlertForm
      status="error"
      title="Hay errores en el formulario"
      description="Asegurate de llenar todos los campos requeridos correctamente."
      setShowAlert={setShowAlert}
      onClose={onClose}
    />
  );
}
function SuccedForm({ setShowAlert, onClose } = {}) {
  return (
    <AlertForm
      status="success"
      title="Enviado correctamente"
      description="Tu publicación se creó/actualizó correctamente."
      setShowAlert={setShowAlert}
      onClose={onClose}
    />
  );
}

export default AlertForm;
export { SuccedForm, ErrorForm };
