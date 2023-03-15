import { Heading, VStack } from "@chakra-ui/react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import MainPage from "../components/Home/MainPage";
import Post from "../components/Home/Post";
import { dbService } from "../utils/firebase";
import { INotes } from "./Notes";

export default function Home() {
  const [notes, setNotes] = useState<INotes[] | undefined>(undefined);

  const getNotes = async () => {
    const q = query(
      collection(dbService, "notes"),
      orderBy("createdAt", "desc"),
      limit(4)
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
    getNotes();
  }, []);

  return (
    <VStack
      minH={"auto"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      position={"relative"}
    >
      <MainPage />
      <VStack w={"100%"} justifyContent={"center"}>
        <Heading my={10}>Recent Notes</Heading>
        <VStack gap={10}>
          {notes?.map((note, index) => (
            <Post
              key={note.id}
              link={note.id}
              title={note.title}
              md={note.md}
              thumbnailUrl={note.thumbnailUrl}
              category={note.category}
              createdAt={note.createdAt}
              reverse={index % 2 === 0 ? true : false}
            />
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
}
