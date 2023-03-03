import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SiFirebase, SiReact, SiTypescript } from "react-icons/si";

export default function Footer() {
  return (
    <>
      <VStack width={"100vw"} mt={100} mb={10}>
        <HStack fontSize={"xl"}>
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
      </VStack>
    </>
  );
}
