import {
  Center,
  Grid,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { SiJavascript, SiTypescript } from "react-icons/si";
import styled from "styled-components";
import NoteCard from "../components/Notes/NoteCard";

const BackGround = styled(motion.div)<{ bg: string }>`
  width: 100vw;
  height: 40vh;
  position: absolute;
  z-index: -1;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bg});
`;

const BackGroundCover = styled.div`
  width: 100vw;
  height: 40vh;
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

const gridVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Notes() {
  const [tag, setTag] = useState("ALL");
  const onTagButtonClicked = (e: any) => {
    setTag(e.currentTarget.value);
  };
  return (
    <VStack minH={"150vh"} justifyContent={"flex-start"} position={"relative"}>
      <BackGround bg="/assets/imgs/weather.jpeg" />
      <BackGroundCover />
      <Center minH={"40vh"} color="white" zIndex={2}>
        <Heading textShadow="3px 3px #1A94DA" fontSize={"7xl"}>
          Notes
        </Heading>
      </Center>
      <VStack position={"relative"}>
        <HStack
          gap={3}
          my={"10"}
          border={"1px solid"}
          padding={"10"}
          rounded={"2xl"}
        >
          <Heading>TAG : {tag}</Heading>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GoThreeBars />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                icon={<BsEye />}
                value={"ALL"}
                onClick={(e) => onTagButtonClicked(e)}
              >
                ALL
              </MenuItem>
              <MenuItem
                icon={<FaReact />}
                value={"React"}
                onClick={(e) => onTagButtonClicked(e)}
              >
                React
              </MenuItem>
              <MenuItem
                icon={<SiTypescript />}
                value={"TypeScript"}
                onClick={(e) => onTagButtonClicked(e)}
              >
                TypeScript
              </MenuItem>
              <MenuItem
                icon={<SiJavascript />}
                value={"JavaScript"}
                onClick={(e) => onTagButtonClicked(e)}
              >
                JavaScript
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <AnimatePresence>
          <Grid
            templateColumns={"repeat(3, 1fr)"}
            px={10}
            columnGap={8}
            rowGap={16}
            as={motion.div}
            variants={gridVariants}
            initial="hidden"
            animate="show"
          >
            {[1, 2, 3, 4, 32, 521, 512, 34, 3123].map((i) => (
              <NoteCard />
            ))}
          </Grid>
        </AnimatePresence>
      </VStack>
    </VStack>
  );
}
