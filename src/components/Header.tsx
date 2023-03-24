import {
  Avatar,
  Box,
  Button,
  DarkMode,
  HStack,
  IconButton,
  LightMode,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useMatch, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, useAnimation, useScroll, Variants } from "framer-motion";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoginAtom, isNotesAtom, selectedCategoryAtom } from "../utils/atoms";
import LoginModal from "./Header/LoginModal";
import LoginPopover from "./Header/LoginPopover";
import { vhToPixels } from "../utils/utilsFn";

const headerVariants: Variants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(223, 249, 251,0.9)",
  },
};

const hugmeVariants: Variants = {
  top: (vh: number) => {
    return {
      y: -vh,
    };
  },
  scroll: {
    y: 0,
    transition: {
      type: "spring",
    },
  },
};

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigation = useNavigate();
  const { toggleColorMode } = useColorMode();
  const twitterColor = useColorModeValue("twitter.500", "twitter.500");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const { scrollY } = useScroll();
  const headerAni = useAnimation();
  const hugmeAni = useAnimation();
  const [boxShadow, setBoxShadow] = useState(false);
  const [textColor, setTextColor] = useState(false);
  const homeMatch = useMatch("/");
  const notesMatch = useMatch("/notes/:category");
  const guestBookMatch = useMatch("/guestbook");
  const isLogin = useRecoilValue(isLoginAtom);
  const isNotes = useRecoilValue(isNotesAtom);
  const setSelectedCategory = useSetRecoilState(selectedCategoryAtom);
  const { scrollYProgress } = useScroll();

  console.log(scrollYProgress);
  const onHomeClick = () => {
    navigation("/");
  };
  const onNotesClick = () => {
    if (isNotes) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigation("/notes");
      setSelectedCategory("ALL");
    }
  };
  const onWriteClick = () => {
    navigation("/write");
  };
  const onGuestBookClick = () => {
    navigation("/guestbook");
  };

  const hoverEnd = () => {
    if (scrollY.get() < 80) {
      setBoxShadow(false);
    }
  };

  const onHugMeClicked = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        headerAni.start("scroll");
        hugmeAni.start("scroll");
        setBoxShadow(true);
        setTextColor(true);
      } else {
        headerAni.start("top");
        hugmeAni.start("top");
        setBoxShadow(false);
        setTextColor(false);
      }
    });
  }, [scrollY, headerAni, hugmeAni]);

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
        transform="auto"
      >
        <HStack>
          <Box
            zIndex={99}
            transition={"0.3s"}
            rounded={"md"}
            fontWeight={"bold"}
            cursor={"pointer"}
            onClick={onHomeClick}
            bgColor={homeMatch ? twitterColor : undefined}
            _hover={{
              bgColor: "rgba(0,0,0,0.5)",
            }}
          >
            <DarkMode>
              <Text
                transition={"0.3s"}
                px={4}
                py={2}
                textColor={!textColor ? "white" : "black"}
                textShadow={"#fff 1px 0 10px"}
              >
                Home
              </Text>
            </DarkMode>
          </Box>
          <Box
            zIndex={99}
            transition={"0.3s"}
            rounded={"md"}
            fontWeight={"bold"}
            cursor={"pointer"}
            onClick={onNotesClick}
            bgColor={notesMatch ? twitterColor : undefined}
            _hover={{
              bgColor: "rgba(0,0,0,0.5)",
            }}
          >
            <DarkMode>
              <Text
                transition={"0.3s"}
                px={4}
                py={2}
                textColor={!textColor ? "white" : "black"}
                textShadow={"#fff 1px 0 10px"}
              >
                Notes
              </Text>
            </DarkMode>
          </Box>
          <Box
            zIndex={99}
            transition={"0.3s"}
            rounded={"md"}
            fontWeight={"bold"}
            cursor={"pointer"}
            onClick={onGuestBookClick}
            bgColor={guestBookMatch ? twitterColor : undefined}
            _hover={{
              bgColor: "rgba(0,0,0,0.5)",
            }}
          >
            <DarkMode>
              <Text
                transition={"0.3s"}
                px={4}
                py={2}
                textColor={!textColor ? "white" : "black"}
                textShadow={"#fff 1px 0 10px"}
              >
                Guest Book
              </Text>
            </DarkMode>
          </Box>

          <Box
            zIndex={99}
            transition={"0.3s"}
            rounded={"md"}
            fontWeight={"bold"}
            cursor={"pointer"}
            onClick={onWriteClick}
            _hover={{
              bgColor: "rgba(0,0,0,0.5)",
            }}
          >
            <DarkMode>
              <Text
                transition={"0.3s"}
                px={4}
                py={2}
                textColor={!textColor ? "white" : "black"}
                textShadow={"#fff 1px 0 10px"}
              >
                Write
              </Text>
            </DarkMode>
          </Box>

          <IconButton
            zIndex={99}
            aria-label="toggleColorMode"
            onClick={toggleColorMode}
            variant={"solid"}
            colorScheme={"twitter"}
            bgColor={notesMatch ? twitterColor : undefined}
            _hover={{
              bgColor: "rgba(0,0,0,0.5)",
            }}
            icon={<Icon />}
          />
        </HStack>
        {isLogin ? (
          <LoginPopover />
        ) : (
          <IconButton
            zIndex={99}
            onClick={onOpen}
            aria-label="usericon"
            colorScheme={"twitter"}
            icon={<FaUserCircle />}
          />
        )}
        <Box
          bgColor="twitter.500"
          opacity={0.3}
          zIndex={1}
          w="110vw"
          h="10vh"
          as={motion.div}
          style={{ scaleX: scrollYProgress }}
          transformOrigin="left"
          position="absolute"
          left={-3}
          top={0}
        ></Box>
      </HStack>
      <Avatar
        src={
          "https://firebasestorage.googleapis.com/v0/b/ou9999-first-blog.appspot.com/o/icons%2Fhug_me.png?alt=media&token=c44657ff-630e-4edb-a382-b78495387339"
        }
        size={"xl"}
        position={"fixed"}
        zIndex={99}
        bottom={5}
        right={5}
        cursor="pointer"
        onClick={onHugMeClicked}
        as={motion.div}
        variants={hugmeVariants}
        animate={hugmeAni}
        initial={"top"}
        custom={vhToPixels(130)}
      />
      {isLogin ? null : <LoginModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
