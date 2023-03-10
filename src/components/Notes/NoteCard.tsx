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
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { FaEye, FaRegCommentDots } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { dateFormatter } from "../../utils/utilsFn";

const cardVariants: Variants = {
  show: {
    opacity: [0, 1],
    y: [-100, 0],
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 100,
    },
  },
};

interface INoteCardProps {
  title: string;
  md: string;
  category: string;
  createdAt: number;
  thumbnailUrl: string;
}

export default function NoteCard({
  title,
  md,
  category,
  createdAt,
  thumbnailUrl,
}: INoteCardProps) {
  const [magnification, setMagnification] = useState(false);
  const twitterColor = useColorModeValue("twitter.500", "twitter.200");
  const date = dateFormatter(createdAt);
  return (
    <>
      <Box
        as={motion.div}
        initial={{ y: 0 }}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        cursor="pointer"
      >
        <Card
          maxW="sm"
          minH={"sm"}
          as={motion.div}
          variants={cardVariants}
          initial="normal"
          animate="show"
          exit="exit"
          boxShadow={"2xl"}
          onHoverStart={() => setMagnification(true)}
          onHoverEnd={() => setMagnification(false)}
        >
          <CardBody>
            <Box overflow={"hidden"} borderRadius="lg">
              <Image
                src={thumbnailUrl}
                alt="thumbnail"
                borderRadius="lg"
                transform={"auto"}
                scale={magnification ? 1.05 : 1}
                transition={"0.5s"}
              />
            </Box>
            <Stack mt="6" spacing="3">
              <Heading
                size="md"
                noOfLines={1}
                transition={"0.3s"}
                cursor={"pointer"}
                _hover={{
                  color: twitterColor,
                }}
              >
                {title}
              </Heading>
              <Text noOfLines={4} minH={"24"}>
                {md}
              </Text>
              <Button colorScheme={"twitter"} fontSize="lg" width={"50%"}>
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
