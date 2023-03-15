import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
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
import { FaRegComment, FaRegComments } from "react-icons/fa";
import styled from "styled-components";
import { images } from "../../constants/mainPageArray";
import { INotes } from "../../routes/Notes";
import { dbService } from "../../utils/firebase";
import NoteCard from "../Notes/NoteCard";

const BackGroundComment = styled(motion.div)<{ bg: string | undefined }>`
  width: 100vw;
  height: 200vh;
  position: absolute;
  z-index: -1;
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
  z-index: 1;
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
}

export default function EntryFooter({ category }: IEntryFooterProps) {
  const bgColor = useColorModeValue("white", "#1A202C");
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [notes, setNotes] = useState<INotes[] | undefined>(undefined);

  const getNotes = async () => {
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
  };

  useEffect(() => {
    setBackgroundImage(
      `/assets/imgs/${images[Math.floor(Math.random() * images.length)]}`
    );
  }, []);

  useEffect(() => {
    getNotes();
  }, [category]);

  return (
    <>
      <Box py={"10"} />
      <Box width={"full"} height={"auto"} position={"relative"}>
        <BackGroundComment bg={backgroundImage} />
        <BackGroundCoverComment />
      </Box>
      <Box
        width={"full"}
        height={"auto"}
        zIndex={2}
        paddingLeft={20}
        paddingTop={20}
      >
        <Heading
          fontSize="6xl"
          fontWeight="extrabold"
          textShadow={"black 1px 0 10px"}
          color={"white"}
        >
          카테고리의 다른글
        </Heading>
      </Box>
      <Grid
        templateColumns={"repeat(3, 1fr)"}
        px={10}
        paddingTop={10}
        columnGap={8}
        rowGap={16}
        zIndex={2}
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
      <Box w={"full"} height={"auto"} zIndex={2} pt={"32"}>
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
                border={"1px solid"}
                boxShadow={"dark-lg"}
                boxSizing="border-box"
                position={"relative"}
                p={5}
                gap={3}
              >
                <HStack width={"80%"} p={5} gap={3}>
                  <Avatar />
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaRegComment color="gray.300" />}
                    />
                    <Input type="text" placeholder="닉네임" variant="filled" />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaRegComment color="gray.300" />}
                    />
                    <Input
                      type="password"
                      placeholder="비밀번호"
                      variant="filled"
                    />
                  </InputGroup>
                </HStack>
                <Textarea
                  alignItems={"flex-start"}
                  placeholder="Here is a sample placeholder"
                  height={"30vh"}
                />
                <Flex width={"full"} justifyContent={"flex-end"}>
                  <Button colorScheme={"twitter"}>댓글 작성</Button>
                </Flex>
              </VStack>
            </VStack>
          </Center>
        </Box>
      </Box>
    </>
  );
}
