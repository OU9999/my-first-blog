import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function Home() {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, []);
  return (
    <VStack
      minH={"auto"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
    >
      <Text>HOME</Text>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        trapFocus={false}
        motionPreset={"scale"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>모달헤더!</ModalHeader>
          <ModalBody>모달바디!</ModalBody>
          <ModalFooter>
            <Button colorScheme={"gray"} onClick={onToggle}>
              알겠어요!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
