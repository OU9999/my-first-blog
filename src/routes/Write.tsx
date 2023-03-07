import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { writeAtom } from "../utils/atoms";

export default function Write() {
  const isWriteMatch = useMatch("/write");
  const setIsWrite = useSetRecoilState(writeAtom);
  const [md, setMd] = useState<string | undefined>("# 내용을 입력하세요...");
  const [vh, setVh] = useState<number>();
  const [secondVh, setSecondVh] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const colorMode = useColorModeValue("light", "dark");
  const bgColor = useColorModeValue("FFFFFF", "#0E1117");
  const navigation = useNavigate();

  const vhToPixels = (vh: number) => {
    return Math.round(window.innerHeight / (100 / vh));
  };

  const onOutClicked = () => {
    navigation(-1);
  };

  const onTitleChange = (e: any) => {
    setTitle(e.currentTarget.value);
  };

  useEffect(() => {
    setVh(vhToPixels(78));
    setSecondVh(vhToPixels(100));
    if (isWriteMatch) setIsWrite(true);
    return () => {
      setIsWrite(false);
    };
  }, []);

  return (
    <>
      <HStack
        minW={"100vw"}
        minH={"100vh"}
        boxSizing={"border-box"}
        as={motion.div}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { duration: 0.3, type: "linear" },
        }}
      >
        <VStack w={"50%"} minH={"100vh"}>
          <Input
            width={"48vw"}
            minH={"10vh"}
            mt={"3"}
            padding={"10"}
            bgColor={bgColor}
            placeholder="제목을 입력하세요..."
            size="lg"
            fontSize={"4xl"}
            value={title}
            onChange={onTitleChange}
            border={"1px solid"}
            rounded={"1rem"}
            fontWeight={"bold"}
          />
          <Box width={"50vw"} height={"auto"} data-color-mode={colorMode}>
            <MDEditor value={md} onChange={setMd} height={vh} preview="edit" />
          </Box>
          <Flex width={"100%"} height={"8vh"} alignItems={"center"} px={"10"}>
            <Flex width={"50%"}>
              <Button onClick={onOutClicked} variant={"ghost"} fontSize={"2xl"}>
                ← 나가기
              </Button>
            </Flex>
            <Flex width={"50%"} justifyContent={"flex-end"} gap={4}>
              <Button
                onClick={onOutClicked}
                variant={"ghost"}
                colorScheme={"twitter"}
                fontSize={"2xl"}
              >
                임시저장
              </Button>
              <Button
                onClick={onOutClicked}
                colorScheme={"twitter"}
                fontSize={"2xl"}
              >
                출간하기
              </Button>
            </Flex>
          </Flex>
        </VStack>
        <VStack w={"50%"} minH={"100vh"} justifyContent={"center"}>
          <Box width={"50vw"} data-color-mode={colorMode}>
            <MDEditor
              style={{ padding: 10, border: "none" }}
              value={md}
              height={secondVh}
              preview="preview"
              hideToolbar={true}
            />
          </Box>
        </VStack>
      </HStack>
      {/* <VStack
        minH={"100vh"}
        minW={"100vw"}
        py={"10"}
        boxSizing={"border-box"}
        as={motion.div}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { duration: 0.3, type: "linear" },
        }}
      >
        <HStack
          width={"100vw"}
          height={"10vh"}
          overflow={"hidden"}
          justifyContent={"center"}
          gap={5}
        >
          <Input
            width={"48vw"}
            minH={"10vh"}
            padding={"10"}
            bgColor={bgColor}
            placeholder="제목을 입력하세요..."
            size="lg"
            fontSize={"4xl"}
            value={title}
            onChange={onTitleChange}
            border={"1px solid"}
            rounded={"1rem"}
            fontWeight={"bold"}
          />
          <Text
            width={"48vw"}
            minH={"10vh"}
            padding={"3.5"}
            px={"10"}
            bgColor={bgColor}
            size="lg"
            fontSize={"4xl"}
            border={"1px solid"}
            rounded={"1rem"}
            fontWeight={"bold"}
          >
            {title}
          </Text>
        </HStack>
        <HStack width={"100vw"}>
          <Box width={"50vw"} height={"auto"} data-color-mode={colorMode}>
            <MDEditor value={md} onChange={setMd} height={vh} preview="edit" />
          </Box>
          <Box width={"50vw"} height={"auto"} data-color-mode={colorMode}>
            <MDEditor
              style={{ padding: 10 }}
              value={md}
              height={vh}
              preview="preview"
              hideToolbar={true}
            />
          </Box>
        </HStack>
        <HStack minH={"10vh"} minW={"100vw"} px={"10"}>
          <HStack width={"50%"}>
            <Button onClick={onOutClicked}> ← 나가기</Button>
            <Button onClick={onOutClicked}> ← 나가기</Button>
            <Button onClick={onOutClicked}> ← 나가기</Button>
          </HStack>
          <Box width={"50%"}></Box>
        </HStack>
      </VStack> */}
    </>
  );
}
