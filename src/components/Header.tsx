import {
  HStack,
  IconButton,
  Tab,
  TabList,
  Tabs,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
  const navigation = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const onHomeClick = () => {
    navigation("/");
  };
  const onNotesClick = () => {
    navigation("/notes");
  };
  return (
    <>
      <HStack
        minW={"100vw"}
        px={5}
        py={5}
        backgroundColor={"transparent"}
        position={"fixed"}
        zIndex={"99"}
        _hover={{
          backgroundColor: "green.100",
          transitionDuration: "0.3s",
          transitionTimingFunction: "ease-in-out",
        }}
        spacing={2}
      >
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab onClick={onHomeClick}>Home</Tab>
            <Tab onClick={onNotesClick}>Notes</Tab>
          </TabList>
        </Tabs>
        <IconButton
          aria-label="toggleColorMode"
          onClick={toggleColorMode}
          variant={"ghost"}
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        />
      </HStack>
    </>
  );
}
