import {
  Avatar,
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { SiFirebase } from "react-icons/si";
import { Link } from "react-router-dom";
import { authService } from "../../utils/firebase";

export default function LoginPopover() {
  const toast = useToast();
  const onLogOutClick = () => {
    authService.signOut();
    toast({
      title: "로그아웃!",
      position: "top",
      isClosable: true,
    });
  };

  return (
    <>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Avatar
            size="md"
            name="Ryan Florence"
            src={`/assets/imgs/profile.jpeg`}
            cursor="pointer"
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent marginTop={6} boxShadow={"dark-lg"}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <VStack>
                <Avatar
                  size="2xl"
                  name="Ryan Florence"
                  src={`/assets/imgs/profile.jpeg`}
                  cursor="pointer"
                />
                <VStack spacing={-1}>
                  <Text fontWeight={"bold"} fontSize={"2xl"}>
                    오유진
                  </Text>
                  <HStack
                    spacing={0.5}
                    justifyContent="center"
                    alignItems={"center"}
                  >
                    <FaGithub />
                    <Text color={"gray"}>OU9999</Text>
                  </HStack>
                </VStack>
              </VStack>
            </PopoverBody>
            <PopoverFooter
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <HStack>
                <Link
                  to="https://console.firebase.google.com/u/0/project/ou9999-first-blog/overview?hl=ko"
                  target="_blank"
                >
                  <Button
                    colorScheme={"twitter"}
                    leftIcon={<SiFirebase />}
                    variant={"outline"}
                  >
                    Firebase
                  </Button>
                </Link>

                <Button colorScheme={"twitter"} onClick={() => onLogOutClick()}>
                  Logout
                </Button>
              </HStack>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}
