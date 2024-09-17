import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size={{ base: "xs", sm: "md", md: "lg", lg: "xl", xl: "3xl" }} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h={{ base: "450px", md: "400px" }} p={4} bgGradient="linear(to-br, teal.300, blue.500)" color="white">
          <ModalHeader
            fontSize={{ base: "24px", md: "30px", lg: "40px" }}
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            textAlign={{ base: "center", md: "left" }}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxShadow="lg"
              border="4px solid white"
              boxSize={{ base: "80px", sm: "100px", md: "120px" }}
              src={user.pic}
              alt={user.name}
            />
            <Box
              mt={4}
              textAlign={{ base: "center", md: "left" }}
              w="full"
              p={4}
              bg="whiteAlpha.200"
              borderRadius="md"
              boxShadow="lg"
            >
              <Text
                fontSize={{ base: "15px", sm: "18px", md: "20px" }}
                fontFamily="Work sans"
                color="white"
              >
                Email: {user.email}
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button bg="blue.600" _hover={{ bg: "blue.400" }} color="white" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
