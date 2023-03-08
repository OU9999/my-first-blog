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
  const images = [
    "eye.jpg",
    "eyes.jpeg",
    "eye3.jpeg",
    "tyler.webp",
    "about_time.jpeg",
    "mononoke.gif",
    "miles.jpeg",
    "about_time.jpeg",
    "howls.gif",
    "eternal_sunshine.jpeg",
    "paper_man1.gif",
    "paper_man2.gif",
    "rock.jpeg",
    "ear.gif",
    "spirited-away.gif",
    "weather.jpeg",
    "kimino.png",
    "zootopia.jpeg",
    "mermaid.gif",
    "suzeme.jpeg",
  ];

  const quotes = [
    "넌 아름다워, 같은 길을 가는 별은 없어, 마음을 따라가 , 생각과 마음의 나침반이 일치하는 그곳.",
    "이 순간들이 늘 고맙고 소중해.",
    "이렇게 쉬운 것도 영원히 못 하게 되는 순간이 오니까.",
    "순간아 멈추어라 너 정말 아름답구나...",
    "아무도 미워하지 않을 거에요. 나 자신을 위해서.",
    "인생은 영화랑 다르지만 영화를 만드는건 결국 인생이다.",
    "난 두려워, 이 세상은 의미없어... 달과 별이 있는, 너 있는 그 곳에 데려가 줘.",
    "저는 당신을 사랑해요.  하지만 당신을 절 사랑하지 않아도 괜찮아요.",
    "그때 그 아이는 어떻게 내가 되었나.",
    "마음이 기억하는데, 어떻게 잊어버리나요.",
    "상상만으로도 행복해지네요.",
    "성공을 거듭하면 자신감이 높아지지만, 자존감은 실패를 극복할때 깊어진다.",
    "마음이라는 건 늘 너무 늦게 도착해서 더 슬프게만 느껴질지도 모르겠다.",
    "난 널 떠나보내는게 제일 두렵고 싫었는데 네가 행복하지 않은 건 더 싫구나.",
    "고마워, 사랑해줘서...",
    "소중한 것들은 사라졌을 때 비로소 그 가치가 빛난다.",
    "같이 미쳐있다 생각했는데 , 어느새 너는 현실로 돌아갔구나 , 나를 홀로 두고.",
    "그 기억들을 가진건 , 세상에 딱 둘뿐인데 , 내가 아까워서 어떻게 잊나요 그걸.",
    "사람들은 내가 불행하다 생각하지만.. 난 그냥 조용함을 즐길뿐이야.",
    "사랑에 빠졌어요 , 너무 아파요. 하지만 낫고 싶지 않아요.",
    "그대의 자질은 아름답다. 그런 자질을 가지고 아무것도 하지 않겠다 하더라도 내 뭐라 할 수 없지만 , 그대가 만약 온 마음과 힘을 다해 노력한다면 무슨 일인들 해내지 못하겠는가.",
    "인생에는 당연히 빈 틈이 있기 마련이야... 그걸 미친놈 처럼 일일이 다 메울 순 없어.",
    "영원할줄 알았던 넌 잠시 머물렀다 가는 계절이었구나.",
    "화는 한 순간이지만 , 후회는 평생 간다.",
    "오만은 내가 다른사람이 나를 사랑할수 없게 만들고 , 편견은 내가 다른사람을 사랑하지 못하게 만든다.",
  ];

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
