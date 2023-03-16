import {
  Avatar,
  Center,
  Heading,
  HStack,
  IconButton,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCommentSlash, FaEdit } from "react-icons/fa";
import { FiCornerDownRight } from "react-icons/fi";

export default function CommentReply() {
  const [option, setOption] = useState(false);
  const bgColor = useColorModeValue("#fff", "#2D3748");
  return (
    <>
      <Center w="55%" h="auto">
        <Center w={"10%"} fontSize={"4xl"}>
          <FiCornerDownRight />
        </Center>
        <VStack
          w="90%"
          rounded={"2xl"}
          boxShadow={"dark-lg"}
          p={"10"}
          alignItems={"flex-start"}
          gap={3}
          as={motion.div}
          onHoverStart={() => {
            setOption(true);
          }}
          onHoverEnd={() => {
            setOption(false);
          }}
          bgColor={bgColor}
        >
          <HStack w={"full"} justifyContent={"space-between"}>
            <HStack alignItems={"center"} gap={4}>
              <Avatar />
              <VStack alignItems={"flex-start"}>
                <Heading fontSize={"2xl"}>reply</Heading>
                <HStack>
                  <Text fontSize={"xs"}>2023년 3월 16일 오후 1:02</Text>
                </HStack>
              </VStack>
            </HStack>
            <HStack gap={2} opacity={option ? 1 : 0} transition={"0.5s"}>
              <Tooltip label="수정" aria-label="edit" placement="top">
                <IconButton
                  fontSize={"xl"}
                  aria-label="edit"
                  children={<FaEdit />}
                  variant="ghost"
                />
              </Tooltip>
              <Tooltip label="삭제" aria-label="delete" placement="top">
                <IconButton
                  fontSize={"xl"}
                  aria-label="delete"
                  children={<FaCommentSlash />}
                  variant="ghost"
                />
              </Tooltip>
            </HStack>
          </HStack>
          <Text>reply</Text>
        </VStack>
      </Center>
    </>
  );
}
