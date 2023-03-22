import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
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
import { useState } from "react";
import {
  FaLock,
  FaRegComments,
  FaUser,
  FaUserAstronaut,
  FaUserGraduate,
  FaUserInjured,
  FaUserMd,
  FaUserNinja,
  FaUserSecret,
  FaUserTie,
} from "react-icons/fa";
import { dbService } from "../../../utils/firebase";

interface ICommentInputProps {
  docId: string;
}

export const userIcons = [
  {
    string: "normal",
    icon: <FaUser fontSize={"1.7rem"} />,
  },
  {
    string: "ninja",
    icon: <FaUserNinja fontSize={"1.7rem"} />,
  },
  {
    string: "secret",
    icon: <FaUserSecret fontSize={"1.7rem"} />,
  },
  {
    string: "tie",
    icon: <FaUserTie fontSize={"1.7rem"} />,
  },
  {
    string: "md",
    icon: <FaUserMd fontSize={"1.7rem"} />,
  },
  {
    string: "graduate",
    icon: <FaUserGraduate fontSize={"1.7rem"} />,
  },
  {
    string: "injured",
    icon: <FaUserInjured fontSize={"1.7rem"} />,
  },
  {
    string: "astronaut",
    icon: <FaUserAstronaut fontSize={"1.7rem"} />,
  },
];

export default function CommentInput({ docId }: ICommentInputProps) {
  const [userIcon, setUserIcon] = useState<any>(userIcons[0]);
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const bgColor = useColorModeValue("white", "#1A202C");
  const inputBgColor = useColorModeValue("#fff", "#2D3748");
  const toast = useToast();

  const onAvatarClicked = () => {
    setUserIcon(userIcons[Math.floor(Math.random() * userIcons.length)]);
  };

  const onAddButtonClicked = async () => {
    if (nickname === "" || password === "" || comment === "") {
      toast({
        title: "빈칸이 있습니다.",
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (nickname.length > 15) {
      toast({
        title: `닉네임이 너무 깁니다..( ${nickname.length} / 15 )`,
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (comment.length > 500) {
      toast({
        title: `댓글이 너무 깁니다..( ${comment.length} / 500 )`,
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    await addDoc(collection(dbService, "comments"), {
      docId: docId,
      avatar: userIcon.string,
      nickname: nickname,
      password: password,
      comment: comment,
      createdAt: Date.now(),
      edited: false,
    });
    toast({
      title: "댓글작성 완료!",
      position: "top",
      isClosable: true,
    });
  };

  return (
    <>
      <Box bgColor={bgColor} w={"full"} py={"24"}>
        <Center w={"full"}>
          <VStack w={"full"}>
            <Box fontSize={"9xl"} my={"10"}>
              <FaRegComments />
            </Box>
            <VStack
              alignItems={"flex-start"}
              w={"55%"}
              h={"50vh"}
              rounded={"2xl"}
              boxShadow={"dark-lg"}
              boxSizing="border-box"
              position={"relative"}
              p={5}
              gap={3}
              bgColor={inputBgColor}
            >
              <HStack width={"80%"} p={5} gap={3}>
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
              <Textarea
                alignItems={"flex-start"}
                placeholder="댓글 작성란..."
                height={"30vh"}
                variant={"filled"}
                value={comment}
                onChange={(e) => setComment(e.currentTarget.value)}
              />
              <Flex width={"full"} justifyContent={"flex-end"}>
                <Button colorScheme={"twitter"} onClick={onAddButtonClicked}>
                  댓글 작성
                </Button>
              </Flex>
            </VStack>
          </VStack>
        </Center>
      </Box>
    </>
  );
}
