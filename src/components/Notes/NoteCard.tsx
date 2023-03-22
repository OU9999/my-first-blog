import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaRegCommentDots } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { dateFormatter, selectBasicThumbnail } from "../../utils/utilsFn";
import { Link } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import reset from "styled-reset";

// const cardVariants: Variants = {
//   show: (test: number) => {
//     return {
//       opacity: [0, 1],
//       y: [-100, 0],
//       transition: {
//         duration: 0.8,
//         type: "spring",
//         stiffness: 200,
//       },
//     };
//   },
// };

const NoStyle = styled.div`
  ${reset}
  img,a,blockquote {
    display: none;
  }
`;

interface INoteCardProps {
  title: string;
  md: string;
  category: string;
  createdAt: number;
  thumbnailUrl: string;
  link: string;
}

export default function NoteCard({
  title,
  md,
  category,
  createdAt,
  thumbnailUrl,
  link,
}: INoteCardProps) {
  const [magnification, setMagnification] = useState(false);
  const twitterColor = useColorModeValue("twitter.500", "twitter.200");
  const colorMode = useColorModeValue("light", "dark");
  const mdBgColor = useColorModeValue(
    "rgba(255,255,255,1)",
    "rgba(45,55,72,1)"
  );
  const date = dateFormatter(createdAt);

  return (
    <>
      <Box
        as={motion.div}
        initial={{ y: 0 }}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
      >
        <Card
          maxW="sm"
          minH={"sm"}
          as={motion.div}
          // variants={cardVariants}
          // initial="wait"
          // animate="show"
          // exit="exit"
          // custom={test}
          boxShadow={"2xl"}
          onHoverStart={() => setMagnification(true)}
          onHoverEnd={() => setMagnification(false)}
        >
          <CardBody>
            <Box overflow={"hidden"} borderRadius="lg">
              {thumbnailUrl === "" ? (
                <Link
                  to={{
                    pathname: `/entry/${link}`,
                  }}
                >
                  <Image
                    width={"full"}
                    h={"48"}
                    src={selectBasicThumbnail(category)}
                    alt="thumbnail"
                    borderRadius="lg"
                    transform={"auto"}
                    scale={magnification ? 1.05 : 1}
                    transition={"0.5s"}
                    cursor="pointer"
                  />
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: `/entry/${link}`,
                  }}
                >
                  <Image
                    width={"full"}
                    h={"48"}
                    src={thumbnailUrl}
                    alt="thumbnail"
                    borderRadius="lg"
                    transform={"auto"}
                    scale={magnification ? 1.05 : 1}
                    transition={"0.5s"}
                    cursor="pointer"
                  />
                </Link>
              )}
            </Box>
            <Stack mt="6" spacing="3">
              <Link
                to={{
                  pathname: `/entry/${link}`,
                }}
              >
                <Flex h={"12"} alignItems={"center"}>
                  <Heading
                    size="md"
                    noOfLines={2}
                    transition={"0.3s"}
                    cursor="pointer"
                    _hover={{
                      color: twitterColor,
                    }}
                  >
                    {title}
                  </Heading>
                </Flex>
              </Link>
              <Box position={"relative"}>
                <Box
                  width={"auto"}
                  minH="24"
                  maxH="24"
                  overflow={"hidden"}
                  data-color-mode={colorMode}
                >
                  <NoStyle>
                    <MDEditor.Markdown
                      source={md}
                      style={{
                        backgroundColor: mdBgColor,
                      }}
                    />
                  </NoStyle>
                </Box>
                <Box
                  position={"absolute"}
                  w="full"
                  h="full"
                  background={`linear-gradient(to top, ${mdBgColor} 0%,rgba(255,255,255,0) 100%)`}
                  top={0}
                ></Box>
              </Box>

              <Button
                colorScheme={"twitter"}
                fontSize="lg"
                width={"50%"}
                cursor="auto"
              >
                {category}
              </Button>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <HStack gap={1}>
              <FaEye />
              <FaRegCommentDots />
              <HStack
                spacing={1}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <BiTimeFive />
                <Text>{date}</Text>
              </HStack>
            </HStack>
          </CardFooter>
        </Card>
      </Box>
    </>
  );
}
