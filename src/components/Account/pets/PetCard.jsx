import {
  Badge,
  Button,
  ButtonGroup,
  CardBody,
  Card,
  CardFooter,
  Divider,
  HStack,
  Image,
  Icon,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { DeleteIcon } from "@chakra-ui/icons";
import { MdPlace } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePet } from "redux/Actions/petActions";
import ReusableAlertDialog from "components/account/common/ReusableAlertDialog";

const PetCard = ({
  data: { id, img, sex, specie, age, area },
  user,
  currentPage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toFemenine = (w) =>
    w.toLowerCase().endsWith("o") ? w.slice(0, -1) + "a" : w;

  const specieText =
    sex === "macho" ? specie.toUpperCase() : toFemenine(specie).toUpperCase();

  const ageText =
    age.toLowerCase() === "joven"
      ? "JOVEN"
      : sex === "macho"
      ? age.toUpperCase()
      : toFemenine(age).toUpperCase();

  const color = sex === "macho" ? "blue" : "pink";

  function handleUpdatePet() {
    navigate(`/account/myPets/${id}?page=${currentPage}`);
  }

  function handleDeletePet(id) {
    dispatch(deletePet(id, user?.id));
  }

  return (
    <Card
      width="100%"
      maxW="230px"
      boxShadow="md"
      mx="auto"
      border={"#e2e8f0 solid 1px"}
    >
      <CardBody p="4">
        <Image
          src={img}
          alt="Pet Image"
          borderRadius="md"
          objectFit="cover"
          height="140px"
          width="100%"
        />
        <Stack mt="6" spacing="3">
          <HStack spacing="2" wrap="wrap" mb="3">
            <Badge colorScheme={color} fontSize="0.8em" p="1">
              {specieText}
            </Badge>
            <Badge colorScheme={color} fontSize="0.8em" p="1">
              {ageText}
            </Badge>

            <Tooltip
              label={sex === "macho" ? "Macho" : "Hembra"}
              hasArrow
              placement="right"
              shouldWrapChildren
            >
              <Icon
                as={sex === "macho" ? IoMdMale : IoMdFemale}
                color={color + ".600"}
                boxSize="5"
              />
            </Tooltip>
          </HStack>

          <HStack spacing="1" color="gray.600" mt="2">
            <Icon as={MdPlace} />
            <Text fontSize="sm">{area}</Text>
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="green"
            onClick={() => handleUpdatePet()}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            colorScheme="blue"
            _hover={{
              bg: "red.400",
              color: "white",
            }}
            onClick={onOpen}
          >
            <DeleteIcon boxSize={5} />
          </Button>

          <ReusableAlertDialog
            isOpen={isOpen}
            onClose={onClose}
            title="Eliminar Mascota"
            message={`¿Está seguro/a de querer dejar de publicar la mascota ubicada en el área de "${area}"?\n\nEsta acción no se puede deshacer.`}
            onConfirm={() => handleDeletePet(id)}
          />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default PetCard;
