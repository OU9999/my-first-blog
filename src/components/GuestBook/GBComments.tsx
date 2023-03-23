import { Center } from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../../utils/firebase";
import GBComment from "./GBComment";

interface IGuestBookComment {
  nickname: string;
  password: string;
  avatar: string;
  comment: string;
  createdAt: number;
  edited: boolean;
  userIconPic: string;
  guestBookImg: string;
  id: string;
}

export default function GBComments() {
  const [comments, setComments] = useState<IGuestBookComment[] | undefined>(
    undefined
  );

  const getGuestBookComments = async () => {
    try {
      const q = query(
        collection(dbService, "guestBooks"),
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
    getGuestBookComments();
  }, []);

  return (
    <>
      <Center w="full" h={"auto"} flexDir="column" gap={30}>
        {comments?.map((comment) => (
          <GBComment
            key={comment.id}
            commentId={comment.id}
            nickname={comment.nickname}
            password={comment.password}
            avatar={comment.avatar}
            comment={comment.comment}
            createdAt={comment.createdAt}
            edited={comment.edited}
            userIconPic={comment.userIconPic}
            guestBookImg={comment.guestBookImg}
          />
        ))}
      </Center>
    </>
  );
}
