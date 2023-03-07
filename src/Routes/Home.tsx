import { Heading, VStack } from "@chakra-ui/react";

import MainPage from "../components/Home/MainPage";
import Post from "../components/Home/Post";

export default function Home() {
  return (
    <VStack
      minH={"auto"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      position={"relative"}
    >
      <MainPage />
      <VStack w={"100%"} justifyContent={"center"}>
        <Heading mb={5}>Notes</Heading>
        <VStack gap={10}>
          <Post reverse={false} />
          <Post reverse={true} />
        </VStack>
      </VStack>
    </VStack>
  );
}
