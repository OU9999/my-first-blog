import { Center } from "@chakra-ui/react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../../../utils/firebase";
import Comment from "./Comment";

interface ICommentsProps {
  docId: string;
}

export interface IComment {
  docId: string;
  nickname: string;
  password: string;
  avatar: string;
  comment: string;
  createdAt: number;
  edited: boolean;
  id: string;
}

export default function Comments({ docId }: ICommentsProps) {
  const [comments, setComments] = useState<IComment[] | undefined>(undefined);

  const getComments = async (docId: string) => {
    try {
      const q = query(
        collection(dbService, "comments"),
        where("docId", "==", docId),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (snapshot) => {
        const commentsArr: any = snapshot.docs.map((comment) => ({
          id: comment.id + "",
          ...comment.data(),
        }));
        setComments(commentsArr);
      });
    } catch (error: any) {}
  };

  useEffect(() => {
    getComments(docId);
  }, [docId]);

  return (
    <>
      <Center w="full" h={"auto"} flexDir={"column"} gap={30}>
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            commentId={comment.id}
            nickname={comment.nickname}
            password={comment.password}
            avatar={comment.avatar}
            comment={comment.comment}
            createdAt={comment.createdAt}
            edited={comment.edited}
          />
        ))}
      </Center>
    </>
  );
}
