import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Comments from "../components/Entry/EntryFooter/Comments";
import GBComments from "../components/GuestBook/GBComments";
import GBInput from "../components/GuestBook/GBInput";

const BackGround = styled(motion.div)<{ bg: string }>`
  width: 100vw;
  height: 60vh;
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
  height: 60vh;
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

export default function GuestBook() {
  return (
    <>
      <VStack h="auto" justifyContent={"flex-start"} position={"relative"}>
        <BackGround bg="/assets/imgs/weather.jpeg" />
        <BackGroundCover />
        <Center minH={"60vh"} color="white" zIndex={2}>
          <VStack gap={4}>
            <Heading textShadow={"#000 1px 0 10px"} fontSize={"7xl"}>
              Guest Book
            </Heading>
            <Text
              textShadow={"#000 1px 0 10px"}
              fontSize={"2xl"}
              fontWeight={"bold"}
            >
              시간 내서 블로그에 방문해주셔서 감사해요~!
            </Text>
          </VStack>
        </Center>
        {/* comments */}
        <Box w={"full"} height={"auto"} zIndex={2} pt={"32"}>
          <GBInput />
          <GBComments />
        </Box>
      </VStack>
    </>
  );
}
