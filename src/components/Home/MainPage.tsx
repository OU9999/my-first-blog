import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaQuoteLeft,
  FaQuoteRight,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail, MdReplay } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { images, quotes } from "../../constants/mainPageUtils";
import { startAnimationAtom } from "../../utils/atoms";

const BackGround = styled(motion.div)<{ bg: string }>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -1;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bg});
`;

const BackGroundCover = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: -0.5rem;
  z-index: 1;
  background: repeating-linear-gradient(
    0deg,
    #0e0d0e 25%,
    #0e0d0e 50%,
    #171819 50%,
    #171819 75%
  );

  background-size: 10px 10px;
  opacity: 0.3;
`;

const backgroundVariants: Variants = {
  normal: { opacity: 1 },
  clicked: {
    opacity: [1, 0, 1],
    transition: {
      duration: 1,
      type: "linear",
    },
  },
};

const mainTextVariants: Variants = {
  normal: { y: -100, opacity: 0 },
  start: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 200 },
  },
  colorChange: { color: "#000", transition: { duration: 0.5 } },
};

const mainBoxVariants: Variants = {
  normal: { y: -100, opacity: 0 },
  start: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 200, delay: 0.3 },
  },
};

const quoteVariants: Variants = {
  normal: { y: 0 },
  clicked: {
    y: [0, -50, 0],
    opacity: [1, 0, 1],
    transition: {
      duration: 1,
    },
  },
};

const resetButtonVariants: Variants = {
  hovering: {
    rotateZ: 0,
    transition: {
      duration: 1,
      repeat: Infinity,
      type: "tween",
    },
  },
  clicked: {
    scale: [1, 1.3, 1],
    color: ["#fff", "#1A94DA", "#fff"],
    transition: {
      duration: 1,
      type: "spring",
    },
  },
};

export default function MainPage() {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [oClick, setOClick] = useState<boolean>(false);
  const [uClick, setUClick] = useState<boolean>(false);
  const [nineOneClick, setNineOneClick] = useState<boolean>(false);
  const [nineTwoClick, setNineTwoClick] = useState<boolean>(false);
  const [nineThreeClick, setNineThreeClick] = useState<boolean>(false);
  const [nineFourClick, setNineFourClick] = useState<boolean>(false);
  const startAnimation = useRecoilValue(startAnimationAtom);
  const mainTextAni = useAnimation();
  const mainBoxAni = useAnimation();
  const quoteAni = useAnimation();
  const resetButtonAni = useAnimation();
  const backgroundAni = useAnimation();
  const toast = useToast();

  const onOClicked = () => {
    setOClick((prev) => !prev);
  };
  const onUClicked = () => {
    setUClick((prev) => !prev);
  };
  const onNineOneClicked = () => {
    setNineOneClick((prev) => !prev);
  };
  const onNineTwoClicked = () => {
    setNineTwoClick((prev) => !prev);
  };
  const onNineThreeClicked = () => {
    setNineThreeClick((prev) => !prev);
  };
  const onNineFourClicked = () => {
    setNineFourClick((prev) => !prev);
  };

  const setBgAndQuote = () => {
    setBackgroundImage(
      `/assets/imgs/${images[Math.floor(Math.random() * images.length)]}`
    );
    setQuote(`${quotes[Math.floor(Math.random() * quotes.length)]}`);
  };

  const onResetButtonClicked = () => {
    quoteAni.start("clicked");
    backgroundAni.start("clicked");
    resetButtonAni.start("clicked");
    setTimeout(() => setBgAndQuote(), 500);
  };

  const onEmailButtonClicked = () => {
    toast({
      title: `복사 완료!`,
      position: "top",
      isClosable: true,
      icon: (
        <Box fontSize={"2xl"}>
          <MdEmail />
        </Box>
      ),
    });
    navigator.clipboard.writeText("omh232323@gmail.com");
  };

  useEffect(() => {
    setBgAndQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (startAnimation === true) {
      mainTextAni.start("start");
      mainBoxAni.start("start");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation]);
  return (
    <>
      <BackGround
        bg={backgroundImage}
        variants={backgroundVariants}
        animate={backgroundAni}
        initial={"normal"}
      />
      <BackGroundCover />
      <Center w={"100vw"} h={"100vh"}>
        <Flex
          justify={"center"}
          align={"center"}
          direction={"column"}
          position={"relative"}
          zIndex={2}
        >
          <HStack userSelect={"none"} color={"white"}>
            <Text
              fontSize={"9xl"}
              fontWeight={"bold"}
              textShadow={`${oClick ? "#fff" : "#000"} 1px 0 10px`}
              onClick={onOClicked}
              as={motion.p}
              variants={mainTextVariants}
              initial={"normal"}
              animate={mainTextAni}
              cursor={"pointer"}
              whileHover={{
                scale: 1.1,
              }}
            >
              O
            </Text>
            <Text
              fontSize={"9xl"}
              fontWeight={"bold"}
              textShadow={`${uClick ? "#fff" : "#000"} 1px 0 10px`}
              onClick={onUClicked}
              as={motion.p}
              variants={mainTextVariants}
              initial={"normal"}
              animate={mainTextAni}
              cursor={"pointer"}
              whileHover={{
                scale: 1.1,
              }}
            >
              U
            </Text>
            <Text
              fontSize={"9xl"}
              fontWeight={"bold"}
              textShadow={`${nineOneClick ? "#fff" : "#000"} 1px 0 10px`}
              onClick={onNineOneClicked}
              as={motion.p}
              variants={mainTextVariants}
              initial={"normal"}
              animate={mainTextAni}
              cursor={"pointer"}
              whileHover={{
                scale: 1.1,
              }}
            >
              9
            </Text>
            <Text
              fontSize={"9xl"}
              fontWeight={"bold"}
              textShadow={`${nineTwoClick ? "#fff" : "#000"} 1px 0 10px`}
              onClick={onNineTwoClicked}
              as={motion.p}
              variants={mainTextVariants}
              initial={"normal"}
              animate={mainTextAni}
              cursor={"pointer"}
              whileHover={{
                scale: 1.1,
              }}
            >
              9
            </Text>
            <Text
              fontSize={"9xl"}
              fontWeight={"bold"}
              textShadow={`${nineThreeClick ? "#fff" : "#000"} 1px 0 10px`}
              onClick={onNineThreeClicked}
              as={motion.p}
              variants={mainTextVariants}
              initial={"normal"}
              animate={mainTextAni}
              cursor={"pointer"}
              whileHover={{
                scale: 1.1,
              }}
            >
              9
            </Text>
            <Text
              fontSize={"9xl"}
              fontWeight={"bold"}
              textShadow={`${nineFourClick ? "#fff" : "#000"} 1px 0 10px`}
              onClick={onNineFourClicked}
              as={motion.p}
              variants={mainTextVariants}
              initial={"normal"}
              animate={mainTextAni}
              cursor={"pointer"}
              whileHover={{
                scale: 1.1,
              }}
            >
              9
            </Text>
          </HStack>

          <Flex
            as={motion.div}
            variants={mainBoxVariants}
            initial={"normal"}
            animate={mainBoxAni}
            backgroundColor={"red"}
            width="65vw"
            height={"35vh"}
            background={"rgba(0,0,0,0.5)"}
            borderRadius={"3rem"}
            fontSize={"4xl"}
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column"}
            color={"white"}
            padding={"10"}
            gap={20}
            position="relative"
            overflow={"hidden"}
          >
            <HStack
              fontSize={"2xl"}
              gap={1}
              as={motion.div}
              variants={quoteVariants}
              initial={"normal"}
              animate={quoteAni}
              minH={"50%"}
            >
              <FaQuoteLeft />
              <Text fontWeight={"bold"}>{quote}</Text>
              <FaQuoteRight />
            </HStack>
            <Flex gap={10}>
              <Button
                fontSize={"4xl"}
                variant="ghost"
                px={"3"}
                py={"8"}
                colorScheme={"gray"}
              >
                <Link to="https://github.com/OU9999" target="_blank">
                  <FaGithub />
                </Link>
              </Button>
              <Button
                fontSize={"4xl"}
                variant="ghost"
                px={"3"}
                py={"8"}
                colorScheme={"twitter"}
                onClick={() =>
                  toast({
                    title: `사실 트위터 안함 ㅋ`,
                    position: "top",
                    isClosable: true,
                    icon: (
                      <Box fontSize={"2xl"}>
                        <FaTwitter />
                      </Box>
                    ),
                  })
                }
              >
                <FaTwitter />
              </Button>
              <Button
                fontSize={"4xl"}
                variant="ghost"
                px={"3"}
                py={"8"}
                colorScheme={"pink"}
                onClick={() =>
                  toast({
                    title: `사실 인스타 안함 ㅋ`,
                    position: "top",
                    isClosable: true,
                    icon: (
                      <Box fontSize={"2xl"}>
                        <FaInstagram />
                      </Box>
                    ),
                  })
                }
              >
                <FaInstagram />
              </Button>
              <Button
                fontSize={"4xl"}
                variant="ghost"
                px={"3"}
                py={"8"}
                colorScheme={"green"}
                onClick={onEmailButtonClicked}
              >
                <MdEmail />
              </Button>
            </Flex>
            <Box
              as={motion.div}
              position={"absolute"}
              color="#fff"
              bottom={"10"}
              right={"10"}
              variants={resetButtonVariants}
              cursor={"pointer"}
              onClick={onResetButtonClicked}
              animate={resetButtonAni}
              initial={{
                rotateZ: 360,
              }}
              whileHover={"hovering"}
            >
              <MdReplay />
            </Box>
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
