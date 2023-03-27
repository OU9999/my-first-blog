import {
  Avatar,
  Button,
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { FiCornerDownRight } from "react-icons/fi";
import { dbService } from "../../../utils/firebase";
import { userIcons } from "./CommentInput";

interface ICommentReplyInputProps {
  setIsReply: any;
  commentId: string;
}

export default function CommentReplyInput({
  setIsReply,
  commentId,
}: ICommentReplyInputProps) {
  const [userIcon, setUserIcon] = useState<any>(userIcons[0]);
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const bgColor = useColorModeValue("#fff", "#2D3748");
  const toast = useToast();

  const onAvatarClicked = () => {
    setUserIcon(userIcons[Math.floor(Math.random() * userIcons.length)]);
  };

  const onAddButtonClicked = async () => {
    if (nickname === "" || password === "" || comment === "") {
      toast({
        title: "빈칸이 있습니다.",
        position: "top",
        isClosable: true,
      });
      return;
    }
    await addDoc(collection(dbService, "replyComments"), {
      commentId: commentId,
      avatar: userIcon.string,
      nickname: nickname,
      password: password,
      comment: comment,
      createdAt: Date.now(),
      edited: false,
    });
    toast({
      title: "답글작성 완료!",
      position: "top",
      isClosable: true,
    });
    setIsReply(false);
  };

  return (
    <>
      <Center w="full" h="auto">
        <Center w={"24"} fontSize={"4xl"}>
          <FiCornerDownRight />
        </Center>
        <VStack
          w="2xl"
          rounded={"2xl"}
          boxShadow={"dark-lg"}
          p={"10"}
          alignItems={"flex-start"}
          gap={2}
          as={motion.div}
          bgColor={bgColor}
        >
          <HStack width={"80%"} p={2} gap={3}>
            {userIcon && (
              <Avatar
                icon={userIcon.icon}
                onClick={onAvatarClicked}
                cursor={"pointer"}
              />
            )}
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaUser color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="닉네임"
                variant="filled"
                value={nickname}
                onChange={(e) => setNickname(e.currentTarget.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaLock color="gray.300" />}
              />
              <Input
                type="password"
                placeholder="비밀번호"
                variant="filled"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </InputGroup>
          </HStack>
          <VStack w={"full"} gap={3}>
            <Textarea
              height={"40"}
              variant={"filled"}
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
            />
            <HStack w={"full"} justifyContent={"flex-end"}>
              <Button
                onClick={() => setIsReply(false)}
                colorScheme="twitter"
                variant={"ghost"}
              >
                취소
              </Button>
              <Button onClick={onAddButtonClicked} colorScheme="twitter">
                답글 작성
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Center>
    </>
  );
}
