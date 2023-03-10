import {
  Center,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ICategorys } from "../components/Write/AddModal";
import { dbService } from "../utils/firebase";

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

export interface INotes {
  id: string;
  category: string;
  createdAt: number;
  title: string;
  md: string;
  thumbnailUrl: string;
}
export const allCategory = {
  id: "",
  category: "ALL",
  createdAt: 1,
};

export default function Notes() {
  const navigation = useNavigate();
  const [tag, setTags] = useState<string>(allCategory.category);
  const [notes, setNotes] = useState<INotes[] | undefined>(undefined);
  const [categorys, setCategorys] = useState<ICategorys[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    allCategory.category
  );

  const onSetCategoryButtonClicked = (e: any) => {
    setTags(e.currentTarget.value);
    setSelectedCategory(e.currentTarget.value);
    navigation(`${encodeURIComponent(e.currentTarget.value).toLowerCase()}`);
  };

  const getNotes = async () => {
    const q = query(
      collection(dbService, "notes"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const notesArr: any = snapshot.docs.map((note) => ({
        id: note.id + "",
        ...note.data(),
      }));
      setNotes(notesArr);
    });
  };

  const getCategorys = async () => {
    const q = query(
      collection(dbService, "categorys"),
      orderBy("createdAt", "asc")
    );
    onSnapshot(q, (snapshot) => {
      const categoryArr: any = snapshot.docs.map((category) => ({
        id: category.id + "",
        ...category.data(),
      }));
      setCategorys([allCategory, ...categoryArr]);
    });
  };

  useEffect(() => {
    getNotes();
    getCategorys();
    setSelectedCategory(allCategory.category);
    navigation(`${encodeURIComponent(selectedCategory).toLowerCase()}`);
  }, []);

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
          <Heading>Category : {tag}</Heading>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GoThreeBars />}
              variant="outline"
            />
            <MenuList>
              {categorys.map((category) => (
                <>
                  <MenuItem
                    key={category.id}
                    value={category.category}
                    onClick={(e) => onSetCategoryButtonClicked(e)}
                    px={"7"}
                  >
                    {category.category}
                  </MenuItem>
                </>
              ))}
              {/* <MenuItem
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
              </MenuItem> */}
            </MenuList>
          </Menu>
        </HStack>

        <Outlet context={{ selectedCategory, notes, categorys }} />
        {/* <AnimatePresence>
          <Grid
            templateColumns={"repeat(3, 1fr)"}
            px={10}
            columnGap={8}
            rowGap={16}
            as={motion.div}
            variants={gridVariants}
            animate={gridAni}
          >
            {notes &&
              notes.map((note) => (
                <NoteCard
                  key={note.id}
                  title={note.title}
                  md={note.md}
                  category={note.category}
                  createdAt={note.createdAt}
                />
              ))}
          </Grid>
        </AnimatePresence> */}
      </VStack>
    </VStack>
  );
}
