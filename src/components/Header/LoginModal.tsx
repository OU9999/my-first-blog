import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../utils/firebase";

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: ILoginModalProps) {
  const toast = useToast();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const onLoginButtonClick = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        authService,
        emailValue,
        passwordValue
      );
      console.log("login", user);
      toast({
        title: "로그인!",
        position: "top",
        isClosable: true,
      });
      onClose();
    } catch (error: any) {
      console.log(error);
      toast({
        title: "응 아니야",
        position: "top",
        isClosable: true,
        status: "error",
      });
    }
  };
  return (
    <>
      <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Admin Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <InputGroup>
                <InputLeftElement children={<MdEmail />} />
                <Input
                  placeholder="Email"
                  variant={"filled"}
                  type={"email"}
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.currentTarget.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={4}>
              <InputGroup>
                <InputLeftElement children={<FaLock />} />
                <Input
                  type={"password"}
                  placeholder="Password"
                  variant={"filled"}
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.currentTarget.value)}
                />
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="twitter"
              mr={3}
              onClick={() => onLoginButtonClick()}
            >
              Log in
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
