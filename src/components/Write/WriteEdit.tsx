import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoginAtom, writeAtom } from "../../utils/atoms";
import { vhToPixels } from "../../utils/utilsFn";
import AddModal from "./AddModal";

export default function WriteEdit() {
  const loc = useLocation();
  const detail = loc.state;
  const docId = loc.pathname.slice(-20);
  const isWriteMatch = useMatch("/write/:writeid");
  const setIsWrite = useSetRecoilState(writeAtom);
  const [md, setMd] = useState<string | undefined>(detail.md);
  const [vh, setVh] = useState<number>();
  const [secondVh, setSecondVh] = useState<number>();
  const [title, setTitle] = useState<string>(detail.title);
  const colorMode = useColorModeValue("light", "dark");
  const bgColor = useColorModeValue("#ecf0f1", "#0E1117");
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const isLogin = useRecoilValue(isLoginAtom);

  useEffect(() => {}, []);

  const onOutClicked = () => {
    navigation(-1);
  };

  const onTitleChange = (e: any) => {
    setTitle(e.currentTarget.value);
  };

  const onSaveClicked = () => {
    if (isLogin) {
      if (title !== "") {
        onOpen();
      } else {
        toast({
          title: "제목이 비어있습니다.",
          position: "top",
          isClosable: true,
          status: "error",
        });
      }
    } else {
      toast({
        title: "게스트는 글 작성이 불가능합니다.",
        position: "top",
        isClosable: true,
        status: "error",
      });
    }
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
            placeholder="se제목을 입력하세요..."
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
                onClick={onSaveClicked}
                colorScheme={"twitter"}
                fontSize={"2xl"}
              >
                업데이트
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
        <AddModal
          isOpen={isOpen}
          onClose={onClose}
          bgColor={bgColor}
          title={title}
          md={md!}
          thumbnailUrl={detail.thumbnailUrl}
          defaultCategory={detail.category}
          docId={detail.docId}
          isEdit={true}
        />
      </HStack>
    </>
  );
}
