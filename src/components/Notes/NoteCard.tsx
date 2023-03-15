import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
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
//   show: (index: number) => {
//     return {
//       opacity: [0, 1],
//       transition: {
//         duration: 0.8,
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
  const mdBgColor = useColorModeValue(undefined, "#2D3748");
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
          // initial="normal"
          // animate="show"
          // exit="exit"
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
                <Heading
                  size="md"
                  noOfLines={1}
                  transition={"0.3s"}
                  cursor="pointer"
                  _hover={{
                    color: twitterColor,
                  }}
                >
                  {title}
                </Heading>
              </Link>
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
              {/* <Text noOfLines={4} minH={"24"}>
                {md}
              </Text> */}
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
