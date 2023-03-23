import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Text,
  Textarea,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCommentSlash } from "react-icons/fa";
import { FiCornerDownRight } from "react-icons/fi";
import { dbService } from "../../../utils/firebase";
import { dateFormatter } from "../../../utils/utilsFn";
import CommentDeleteModal from "./CommentDeleteModal";
import { userIcons } from "./CommentInput";
import CommentPopover from "./CommentPopover";

interface ICommentReplyProps {
  nickname: string;
  password: string;
  avatar: string;
  comment: string;
  createdAt: number;
  id: string;
  edited: boolean;
}

export default function CommentReply({
  nickname,
  password,
  avatar,
  comment,
  createdAt,
  id,
  edited,
}: ICommentReplyProps) {
  const [icon, setIcon] = useState<JSX.Element>();
  const [option, setOption] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("#fff", "#2D3748");
  const date = dateFormatter(createdAt);
  const toast = useToast();

  const onUpdateButtonClick = async () => {
    const commentsRef = doc(dbService, "replyComments", id!);
    await updateDoc(commentsRef, {
      comment: newComment,
      edited: true,
    });
    toast({
      title: "수정 완료!",
      position: "top",
      isClosable: true,
    });
    setIsEdit(false);
  };

  const avatarTest = (avatar: string) => {
    // eslint-disable-next-line array-callback-return
    userIcons.map((userIcon) => {
      if (avatar === userIcon.string) return setIcon(userIcon.icon);
    });
  };

  useEffect(() => {
    avatarTest(avatar);
  }, [avatar]);

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
              <Avatar icon={icon} />
              <VStack alignItems={"flex-start"}>
                <Heading fontSize={"2xl"}>{nickname}</Heading>
                <HStack>
                  <Text fontSize={"xs"}>
                    {date}
                    {edited ? "(수정됨)" : null}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <HStack gap={2} opacity={option ? 1 : 0} transition={"0.5s"}>
              <CommentPopover password={password} setIsEdit={setIsEdit} />
              <Tooltip label="삭제" aria-label="delete" placement="top">
                <IconButton
                  fontSize={"xl"}
                  aria-label="delete"
                  children={<FaCommentSlash />}
                  variant="ghost"
                  onClick={onOpen}
                />
              </Tooltip>
            </HStack>
          </HStack>
          {isEdit ? (
            <VStack w={"full"} gap={3}>
              <Textarea
                height={"40"}
                variant={"filled"}
                value={newComment}
                onChange={(e) => setNewComment(e.currentTarget.value)}
              />
              <HStack w={"full"} justifyContent={"flex-end"}>
                <Button
                  onClick={() => setIsEdit(false)}
                  colorScheme="twitter"
                  variant={"ghost"}
                >
                  취소
                </Button>
                <Button
                  onClick={() => onUpdateButtonClick()}
                  colorScheme="twitter"
                >
                  수정
                </Button>
              </HStack>
            </VStack>
          ) : (
            <Text>{comment}</Text>
          )}
        </VStack>
      </Center>
      <CommentDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        commentId={id}
        password={password}
        isReply={true}
      />
    </>
  );
}
