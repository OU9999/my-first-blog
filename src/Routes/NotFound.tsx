import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - OU9999's Blog!</title>
      </Helmet>
      <VStack minH="100vh" justifyContent={"center"}>
        <Heading>Page not found.</Heading>
        <Text>길을 잘못 찾았군요...</Text>
        <Link to={"/"}>
          <Button colorScheme={"twitter"} variant="outline">
            Go home
          </Button>
        </Link>
      </VStack>
    </>
  );
}
