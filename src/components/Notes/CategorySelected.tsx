import { Grid } from "@chakra-ui/react";
import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { allCategory, INotes } from "../../routes/Notes";
import { isNotesAtom } from "../../utils/atoms";
import { ICategorys } from "../Write/AddModal";
import NoteCard from "./NoteCard";

const gridVariants: Variants = {
  show: {
    opacity: [0, 1],
    transition: {
      duration: 0.8,
    },
  },
};

interface IContext {
  selectedCategory: string;
  notes: INotes[];
  categorys: ICategorys[];
}

export default function CategorySelected() {
  const { selectedCategory } = useOutletContext<IContext>();
  const { notes } = useOutletContext<IContext>();
  const [showAll, setShowAll] = useState<boolean>(false);
  const setIsNotes = useSetRecoilState(isNotesAtom);
  const gridAni = useAnimation();

  useEffect(() => {
    setIsNotes(true);
    return () => {
      setIsNotes(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedCategory === allCategory.category) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
    gridAni.start("show");
  }, [gridAni, selectedCategory]);

  return (
    <>
      <AnimatePresence>
        <Grid
          templateColumns={"repeat(3, 1fr)"}
          px={10}
          columnGap={8}
          rowGap={16}
          as={motion.div}
          variants={gridVariants}
          animate={gridAni}
        >
          {showAll
            ? notes &&
              notes.map((note) => (
                <NoteCard
                  key={note.id}
                  link={note.id}
                  title={note.title}
                  md={note.md}
                  category={note.category}
                  createdAt={note.createdAt}
                  thumbnailUrl={note.thumbnailUrl}
                />
              ))
            : notes &&
              notes.map((note) =>
                note.category === selectedCategory ? (
                  <>
                    <NoteCard
                      key={note.id}
                      link={note.id}
                      title={note.title}
                      md={note.md}
                      category={note.category}
                      createdAt={note.createdAt}
                      thumbnailUrl={note.thumbnailUrl}
                    />
                  </>
                ) : null
              )}
        </Grid>
      </AnimatePresence>
    </>
  );
}
