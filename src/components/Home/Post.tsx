import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaEye, FaRegCommentDots } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import styled from "styled-components";

const PostDiv = styled(Box)`
  &:hover img {
    transform: scale(1.15);
  }
`;

interface IPostProps {
  reverse: boolean;
}

export default function Post({ reverse }: IPostProps) {
  return (
    <>
      <PostDiv
        position={"relative"}
        rounded="2xl"
        width={"60vw"}
        height={"40vh"}
        border={"1px"}
        overflow={"hidden"}
        boxShadow={"dark-lg"}
      >
        <HStack
          width={"100%"}
          height={"100%"}
          overflow={"hidden"}
          flexDir={reverse ? "row-reverse" : "row"}
          gap={0}
          spacing={0}
        >
          <VStack
            width={"60%"}
            height={"100%"}
            alignItems={"flex-start"}
            p={10}
            gap={2}
          >
            <Heading
              noOfLines={2}
              cursor="pointer"
              fontSize={"2xl"}
              _hover={{
                color: "twitter.400",
              }}
              transition={"0.3s"}
            >
              [ 프로그래머스 LV.2 ] 이진 변환 반복하기 (JavaScript)
            </Heading>
            <HStack gap={1}>
              <FaEye />
              <FaRegCommentDots />
              <HStack
                spacing={-0.2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <GoThreeBars />
                <Text>React</Text>
              </HStack>
            </HStack>
            <Text noOfLines={4}>
              문제 설명 0과 1로 이루어진 어떤 문자열 x에 대한 이진 변환을 다음과
              같이 정의합니다. x의 모든 0을 제거합니다. x의 길이를 c라고 하면,
              x를 "c를 2진법으로 표현한 문자열"로 바꿉니다. 예를 들어, x =
              "0111010"이라면, x에 이진 변환을 가하면 x = "0111010" "1111" "100"
              이 됩니다. 0과 1로 이루어진 문자열 s가 매개변수로 주어집니다. s가
              "1"이 될 때까지 계속해서 s에 이진 변환을 가했을 때, 이진 변환의
              횟수와 변환 과정에서 제거된 모든 0의 개수를 각각 배열에 담아
              return 하도록 solution 함수를 완성해주세요. 제한사항 s의 길이는 1
              이상 150,000 이하입니다. s에는 '1'이 최소 하나 이상 포함되어
              있습니다.
            </Text>
          </VStack>
          <VStack width={"40%"} height={"100%"} overflow={"hidden"}>
            <Image
              src="https://bit.ly/dan-abramov"
              width={"100%"}
              height={"100%"}
              transition={"0.8s"}
            />
          </VStack>
        </HStack>
        <Box
          position={"absolute"}
          bottom={5}
          left={reverse ? "none" : 5}
          right={reverse ? 5 : "none"}
          fontSize={"3xl"}
          cursor={"pointer"}
          _hover={{
            color: "twitter.400",
          }}
          transition={"0.3s"}
        >
          <BsThreeDots />
        </Box>
      </PostDiv>
    </>
  );
}
