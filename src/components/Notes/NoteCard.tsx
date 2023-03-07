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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function NoteCard() {
  const [magnification, setMagnification] = useState(false);
  const twitterColor = useColorModeValue("twitter.500", "twitter.200");

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
          variants={cardVariants}
          boxShadow={"2xl"}
          onHoverStart={() => setMagnification(true)}
          onHoverEnd={() => setMagnification(false)}
        >
          <CardBody>
            <Box overflow={"hidden"} borderRadius="lg">
              <Image
                src="https://velog.velcdn.com/images/ou9999/post/1491df4e-9d9a-4fef-b93b-75a950eb5d88/image.png"
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
                SSR과 CSR? 정적 웹 사이트와 동적 웹 사이트?
              </Heading>
              <Text noOfLines={4} minH={"24"}>
                SSR과 CSR은 모두 웹 애플리케이션에서 클라이언트 측에서
                렌더링되는 방식을 의미합니다.SSR 는 전통적인 PHP, JSP, ASP 혹은
                최근에는 Next.js 등을 사용하여 서버 단에서 HTML/CSS 를 생성하여
                사용자에게 그 결과물만을 전달하는 방식이다.SSR
              </Text>
              <Button colorScheme={"twitter"} fontSize="lg" width={"50%"}>
                HTML5 / CSS3
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
                <Text>2023.03.07</Text>
              </HStack>
            </HStack>
          </CardFooter>
        </Card>
      </Box>
    </>
  );
}
