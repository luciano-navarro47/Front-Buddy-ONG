import React from "react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
} from "@chakra-ui/react";

function AlertForm({ status, title, description, setShowAlert }) {
  return (
    <Box>
      <Alert
        status={status}
        height="100px"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <AlertIcon boxSize={6} />
        <AlertTitle fontWeight="bold">{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <Box position="absolute" right={2} top={2} bg={"red.400"} borderRadius={"full"}>
          <CloseButton onClick={() => setShowAlert(false)} color={"white"}/>
        </Box>
      </Alert>
    </Box>
  );
}

// function ErrorForm() {
//   return (
//     <Box>
//       <Alert
//         status="error"
//         height="100px"
//         alignItems="center"
//         justifyContent="center"
//         textAlign="center"
//       >
//         <AlertIcon boxSize={6} />
//         <Text fontWeight="bold">
//           Asegurate de llenar todos los campos y de no tener errores en el
//           formulario.
//         </Text>
//       </Alert>
//     </Box>
//   );
// }

// function SuccedForm() {
//   return (
//     <Box>
//       <Alert
//         status="success"
//         height="100px"
//         alignItems="center"
//         justifyContent="center"
//         textAlign="center"
//       >
//         <AlertIcon boxSize={6} />
//         <Text fontWeight="bold">
//           Te registraste correctamente. Ahora podés iniciar sesión.
//         </Text>
//       </Alert>
//     </Box>
//   );
// }
export {
  // SuccedForm,
  // ErrorForm,
  AlertForm,
};
