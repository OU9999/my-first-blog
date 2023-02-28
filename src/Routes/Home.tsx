import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { startAnimationAtom } from "../utils/atoms";

const BackGround = styled.div<{ bg: string }>`
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

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Divtwo = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.3);
`;

export default function Home() {
  const images = [
    "0.webp",
    "1.webp",
    "2.webp",
    "3.webp",
    "4.webp",
    "4.webp",
    "5.webp",
    "6.webp",
    "7.webp",
    "8.webp",
    "9.webp",
    "10.webp",
    "11.webp",
  ];

  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const startAnimation = useRecoilValue(startAnimationAtom);

  useEffect(() => {
    setBackgroundImage(
      `/assets/imgs/${images[Math.floor(Math.random() * images.length)]}`
    );
  }, []);

  return (
    <VStack
      minH={"200vh"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
    >
      <BackGround bg={backgroundImage} />
      <Center w={"100vw"} h={"100vh"}>
        <Text fontSize={"9xl"} as={motion.p} initial={{ opacity: 1 }}>
          OU9999
        </Text>
        <Box></Box>
      </Center>
    </VStack>
  );
}
