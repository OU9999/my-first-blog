import {
  Box,
  Button,
  DarkMode,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useMatch, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, useAnimation, useScroll, Variants } from "framer-motion";

import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../utils/atoms";
import LoginModal from "./Header/LoginModal";
import LoginPopover from "./Header/LoginPopover";

const headerVariants: Variants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(223, 249, 251,0.9)",
  },
};

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigation = useNavigate();
  const { toggleColorMode } = useColorMode();
  const twitterColor = useColorModeValue("twitter.500", "twitter.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const { scrollY } = useScroll();
  const headerAni = useAnimation();
  const [boxShadow, setBoxShadow] = useState(false);
  const [textColor, setTextColor] = useState(false);
  const homeMatch = useMatch("/");
  const notesMatch = useMatch("/notes");
  const isLogin = useRecoilValue(isLoginAtom);

  const onHomeClick = () => {
    navigation("/");
  };
  const onNotesClick = () => {
    navigation("/notes");
  };
  const onWriteClick = () => {
    navigation("/write");
  };

  const hoverEnd = () => {
    if (scrollY.get() < 80) {
      setBoxShadow(false);
    }
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        headerAni.start("scroll");
        setBoxShadow(true);
        setTextColor(true);
      } else {
        headerAni.start("top");
        setBoxShadow(false);
        setTextColor(false);
      }
    });
  }, [scrollY, headerAni]);

  return (
    <>
      <HStack
        justifyContent={"space-between"}
        minW={"100vw"}
        transition={"0.3s"}
        p="6"
        px={5}
        py={5}
        h={"10vh"}
        backgroundColor={"transparent"}
        position={"fixed"}
        zIndex={"98"}
        as={motion.div}
        spacing={2}
        variants={headerVariants}
        animate={headerAni}
        onHoverStart={() => setBoxShadow(true)}
        onHoverEnd={() => hoverEnd()}
        boxShadow={boxShadow ? "dark-lg" : "none"}
        boxSizing={"border-box"}
      >
        <HStack>
          <Box
            transition={"0.3s"}
            rounded={"md"}
            fontWeight={"bold"}
            cursor={"pointer"}
            onClick={onHomeClick}
            bgColor={homeMatch ? twitterColor : undefined}
          >
            <DarkMode>
              <Button
                transition={"0.3s"}
                colorScheme={"twitter"}
                variant={"ghost"}
                textColor={!textColor ? "white" : "black"}
              >
                Home
              </Button>
            </DarkMode>
          </Box>
          <Box
            transition={"0.3s"}
            rounded={"md"}
            fontWeight={"bold"}
            cursor={"pointer"}
            onClick={onNotesClick}
            bgColor={notesMatch ? twitterColor : undefined}
          >
            <DarkMode>
              <Button
                transition={"0.3s"}
                colorScheme={"twitter"}
                variant={"ghost"}
                textColor={!textColor ? "white" : "black"}
              >
                Notes
              </Button>
            </DarkMode>
          </Box>
          {isLogin ? (
            <Box
              transition={"0.3s"}
              rounded={"md"}
              fontWeight={"bold"}
              cursor={"pointer"}
              onClick={onWriteClick}
            >
              <DarkMode>
                <Button
                  transition={"0.3s"}
                  colorScheme={"twitter"}
                  variant={"ghost"}
                  textColor={!textColor ? "white" : "black"}
                >
                  Write
                </Button>
              </DarkMode>
            </Box>
          ) : null}

          <IconButton
            aria-label="toggleColorMode"
            onClick={toggleColorMode}
            variant={"solid"}
            colorScheme={"twitter"}
            icon={<Icon />}
          />
        </HStack>
        {isLogin ? (
          <LoginPopover />
        ) : (
          <IconButton
            onClick={onOpen}
            aria-label="usericon"
            colorScheme={"twitter"}
            icon={<FaUserCircle />}
          />
        )}
      </HStack>
      {isLogin ? null : <LoginModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
