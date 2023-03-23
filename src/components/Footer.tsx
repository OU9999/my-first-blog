import {
  Box,
  HStack,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { SiFirebase, SiReact, SiTypescript } from "react-icons/si";

export default function Footer() {
  const bgColor = useColorModeValue("#fff", "#1A202C");
  return (
    <>
      <VStack
        position={"relative"}
        width={"100vw"}
        pt={100}
        pb={50}
        zIndex={5}
        bgColor={bgColor}
      >
        <HStack fontSize={"md"} fontWeight={"semibold"}>
          <Text color={"gray"}>STACK :</Text>
          <Box
            as={motion.div}
            initial={{
              rotateZ: 360,
            }}
            animate={{
              rotateZ: 0,
              transition: {
                duration: 9,
                repeat: Infinity,
                type: "linear",
              },
            }}
          >
            <SiReact color="#61DAFB" />
          </Box>

          <SiTypescript color="#3178C6" />
          <SiFirebase color=" #FFCA28" />
        </HStack>
        <HStack>
          <FaGithub />
          <Link color={"gray"} href="https://github.com/OU9999" isExternal>
            github.com/OU9999
          </Link>
        </HStack>
      </VStack>
    </>
  );
}
