import {
  Avatar,
  Button,
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
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCommentSlash, FaReply } from "react-icons/fa";
import { dbService } from "../../../utils/firebase";
import { dateFormatter } from "../../../utils/utilsFn";
import CommentReply from "./CommenReply";
import CommentDeleteModal from "./CommentDeleteModal";
import { userIcons } from "./CommentInput";
import CommentPopover from "./CommentPopover";
import CommentReplyInput from "./CommentReplyInput";

interface ICommentProps {
  nickname: string;
  password: string;
  avatar: string;
  comment: string;
  createdAt: number;
  commentId: string;
  edited: boolean;
}

interface ICommentReply {
  commentId: string;
  nickname: string;
  password: string;
  avatar: string;
  comment: string;
  createdAt: number;
  edited: boolean;
  id: string;
}

export default function Comment({
  nickname,
  password,
  comment,
  createdAt,
  avatar,
  commentId,
  edited,
}: ICommentProps) {
  const [icon, setIcon] = useState<JSX.Element>();
  const [option, setOption] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const [replyComments, setReplyComments] = useState<
    ICommentReply[] | undefined
  >(undefined);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgColor = useColorModeValue("#fff", "#2D3748");
  const date = dateFormatter(createdAt);

  const onUpdateButtonClick = async () => {
    if (newComment.length > 500) {
      toast({
        title: `댓글이 너무 깁니다..( ${newComment.length} / 500 )`,
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    const commentsRef = doc(dbService, "comments", commentId!);
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

  const getReplyComments = async (commentId: string) => {
    try {
      const q = query(
        collection(dbService, "replyComments"),
        where("commentId", "==", commentId),
        orderBy("createdAt", "asc")
      );
      onSnapshot(q, (snapshot) => {
        const commentsArr: any = snapshot.docs.map((comment) => ({
          id: comment.id + "",
          ...comment.data(),
        }));
        setReplyComments(commentsArr);
      });
    } catch (error: any) {}
  };

  useEffect(() => {
    getReplyComments(commentId);
  }, [commentId]);

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
      <VStack
        w="55%"
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
            <Tooltip label="답글" aria-label="reply" placement="top">
              <IconButton
                fontSize={"xl"}
                aria-label="reply"
                children={<FaReply />}
                variant="ghost"
                onClick={() => setIsReply(true)}
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
          <Text wordBreak={"break-all"}>{comment}</Text>
        )}
      </VStack>

      {isReply ? (
        <CommentReplyInput setIsReply={setIsReply} commentId={commentId} />
      ) : null}
      {replyComments?.map((reply) => (
        <CommentReply
          key={reply.id}
          id={reply.id}
          nickname={reply.nickname}
          password={reply.password}
          avatar={reply.avatar}
          comment={reply.comment}
          createdAt={reply.createdAt}
          edited={reply.edited}
        />
      ))}
      <CommentDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        commentId={commentId}
        password={password}
      />
    </>
  );
}
