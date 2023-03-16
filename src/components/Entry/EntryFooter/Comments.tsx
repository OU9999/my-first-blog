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

interface IComment {
  docId: string;
  nickname: string;
  password: string;
  avatar: string;
  comment: string;
  createdAt: number;
}

interface ICommentReply {
  commentId: string;
  nickname: string;
  password: string;
  avatar: string;
  comment: string;
  createdAt: number;
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
        const commentsArr: any = snapshot.docs.map((note) => ({
          id: note.id + "",
          ...note.data(),
        }));
        setComments(commentsArr);
      });
    } catch (error: any) {}
  };

  useEffect(() => {
    getComments(docId);
  }, [docId]);

  console.log(comments);

  return (
    <>
      <Center w="full" h={"auto"} flexDir={"column"} gap={30}>
        <Comment />
        <Comment />
      </Center>
    </>
  );
}
