import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack minH="100vh" justifyContent={"center"} backgroundColor={"gray.100"}>
      <Heading>Page not found.</Heading>
      <Text>길을 잘못 찾았군요...</Text>
      <Link to={"/"}>
        <Button colorScheme={"red"} variant="outline">
          Go home
        </Button>
      </Link>
    </VStack>
  );
}
