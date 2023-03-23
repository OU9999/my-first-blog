import { Box, Button, Flex, Grid, Heading } from "@chakra-ui/react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import styled from "styled-components";
import { images } from "../../constants/mainPageArray";
import { INotes } from "../../routes/Notes";
import { selectedCategoryAtom } from "../../utils/atoms";
import { dbService } from "../../utils/firebase";
import NoteCard from "../Notes/NoteCard";
import CommentInput from "./EntryFooter/CommentInput";
import Comments from "./EntryFooter/Comments";

const BackGroundComment = styled(motion.div)<{ bg: string | undefined }>`
  width: 100vw;
  height: 200vh;
  position: absolute;
  z-index: 2;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bg});
`;

const BackGroundCoverComment = styled.div`
  width: 100vw;
  height: 200vh;
  position: absolute;
  top: -0.5rem;
  z-index: 3;
  background: repeating-linear-gradient(
    0deg,
    #0e0d0e 25%,
    #0e0d0e 50%,
    #171819 50%,
    #171819 75%
  );

  background-size: 10px 10px;
  opacity: 0.3;
`;

interface IEntryFooterProps {
  category: string;
  docId: string;
}

export default function EntryFooter({ category, docId }: IEntryFooterProps) {
  const navigation = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [notes, setNotes] = useState<INotes[] | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] =
    useRecoilState<string>(selectedCategoryAtom);

  const getNotes = async (category: string) => {
    try {
      const q = query(
        collection(dbService, "notes"),
        where("category", "==", category as string),
        orderBy("createdAt", "desc"),
        limit(3)
      );
      onSnapshot(q, (snapshot) => {
        const notesArr: any = snapshot.docs.map((note) => ({
          id: note.id + "",
          ...note.data(),
        }));
        setNotes(notesArr);
      });
    } catch (error: any) {}
  };

  const onOtherNotesClicked = () => {
    setSelectedCategory(category);
    navigation(`/notes/${encodeURIComponent(selectedCategory).toLowerCase()}`);
  };

  useEffect(() => {
    setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  useEffect(() => {
    getNotes(category);
  }, [category]);

  // const agent_str = navigator.userAgent;
  // console.log(agent_str);

  return (
    <>
      <Box w="full" zIndex={1} position="relative" pb={"28"}>
        <Box py={"10"} />
        <Box width={"full"} height={"auto"} position={"relative"}>
          <BackGroundComment bg={backgroundImage} />
          <BackGroundCoverComment />
        </Box>
        <Box
          width={"full"}
          height={"auto"}
          position="relative"
          zIndex={4}
          paddingX={20}
          paddingTop={20}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading
              fontSize="6xl"
              fontWeight="extrabold"
              textShadow={"black 1px 0 10px"}
              color={"white"}
            >
              카테고리의 다른글
            </Heading>
            <Button colorScheme={"twitter"} onClick={onOtherNotesClicked}>
              다른글 더 보기
            </Button>
          </Flex>
        </Box>

        {/* NoteCards */}
        <Grid
          templateColumns={"repeat(3, 1fr)"}
          px={10}
          paddingTop={10}
          columnGap={8}
          rowGap={16}
          position="relative"
          zIndex={4}
        >
          {notes?.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              thumbnailUrl={note.thumbnailUrl}
              md={note.md}
              category={note.category}
              link={note.id}
              createdAt={note.createdAt}
            />
          ))}
        </Grid>

        {/* comments */}
        <Box
          w={"full"}
          height={"auto"}
          pt={32}
          position="relative"
          zIndex={5}
          bottom={-30}
        >
          <CommentInput docId={docId} />
          <Comments docId={docId} />
        </Box>
      </Box>
    </>
  );
}
