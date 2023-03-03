import {
  Box,
  HStack,
  IconButton,
  Tab,
  TabList,
  Tabs,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, useAnimation, useScroll, Variants } from "framer-motion";

const headerVariants: Variants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
    color: "#fff",
  },
  scroll: { backgroundColor: "rgba(255,255,255,0.9)", color: "#000" },
};

export default function Header() {
  const navigation = useNavigate();
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FaMoon, FaSun);
  const { scrollY } = useScroll();
  const headerAni = useAnimation();
  const [boxShadow, setBoxShadow] = useState(false);

  const onHomeClick = () => {
    navigation("/");
  };
  const onNotesClick = () => {
    navigation("/notes");
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        headerAni.start("scroll");
        setBoxShadow(true);
      } else {
        headerAni.start("top");
        setBoxShadow(false);
      }
    });
  }, [scrollY, headerAni]);

  return (
    <>
      <HStack
        minW={"100vw"}
        boxShadow={boxShadow ? "dark-lg" : "none"}
        p="6"
        px={5}
        py={5}
        backgroundColor={"transparent"}
        position={"fixed"}
        zIndex={"99"}
        as={motion.div}
        spacing={2}
        variants={headerVariants}
        animate={headerAni}
        whileHover={"scroll"}
        boxSizing={"border-box"}
      >
        <Tabs variant="solid-rounded" colorScheme={"twitter"}>
          <TabList>
            <Box
              transition={"0.3s"}
              _hover={{
                color: "#1A94DA",
              }}
            >
              <Tab onClick={onHomeClick}>Home</Tab>
            </Box>
            <Box
              transition={"0.3s"}
              _hover={{
                color: "#1A94DA",
              }}
            >
              <Tab onClick={onNotesClick}>Notes</Tab>
            </Box>
          </TabList>
        </Tabs>

        <IconButton
          aria-label="toggleColorMode"
          onClick={toggleColorMode}
          variant={"solid"}
          icon={<Icon />}
        />
      </HStack>
    </>
  );
}
