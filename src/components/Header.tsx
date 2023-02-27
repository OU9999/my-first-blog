import { HStack, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <HStack
        minW={"100vw"}
        px={5}
        py={5}
        backgroundColor={"transparent"}
        _hover={{
          backgroundColor: "gray",
          transitionDuration: "0.3s",
          transitionTimingFunction: "ease-in-out",
        }}
      >
        <Text>Header!</Text>
      </HStack>
    </>
  );
}
