import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FaEye, FaRegCommentDots } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginPopover from "../Header/LoginPopover";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../utils/atoms";
import LoginModal from "../Header/LoginModal";
import UpdatePopover from "./UpdatePopover";
import { selectBasicThumbnail } from "../../utils/utilsFn";

const PostDiv = styled(Box)`
  &:hover img {
    transform: scale(1.15);
  }
`;

interface IPostProps {
  reverse: boolean;
  title: string;
  md: string;
  category: string;
  createdAt: number;
  thumbnailUrl: string;
  link: string;
}

export default function Post({
  reverse,
  title,
  md,
  category,
  createdAt,
  thumbnailUrl,
  link,
}: IPostProps) {
  const twitterColor = useColorModeValue("twitter.500", "twitter.200");
  const isLogin = useRecoilValue(isLoginAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <PostDiv
        position={"relative"}
        rounded="2xl"
        width={"70vw"}
        height={"40vh"}
        border={"1px"}
        overflow={"hidden"}
        boxShadow={"dark-lg"}
      >
        <HStack
          width={"100%"}
          height={"100%"}
          overflow={"hidden"}
          flexDir={reverse ? "row-reverse" : "row"}
          gap={0}
          spacing={0}
        >
          <VStack
            width={"60%"}
            height={"100%"}
            alignItems={"flex-start"}
            p={10}
            gap={2}
          >
            <Link
              to={{
                pathname: `/entry/${link}`,
              }}
            >
              <Heading
                noOfLines={2}
                cursor="pointer"
                fontSize={"2xl"}
                _hover={{
                  color: twitterColor,
                }}
                transition={"0.3s"}
              >
                {title}
              </Heading>
            </Link>

            <HStack gap={1}>
              <FaEye />
              <FaRegCommentDots />
              <HStack
                spacing={-0.2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <GoThreeBars />
                <Text>{category}</Text>
              </HStack>
            </HStack>
            <Text noOfLines={4}>{md}</Text>
          </VStack>
          <VStack width={"40%"} height={"100%"} overflow={"hidden"}>
            {thumbnailUrl === "" ? (
              <Image
                src={selectBasicThumbnail(category)}
                width={"100%"}
                height={"100%"}
                transition={"0.8s"}
              />
            ) : (
              <Image
                src={thumbnailUrl}
                width={"100%"}
                height={"100%"}
                transition={"0.8s"}
              />
            )}
          </VStack>
        </HStack>
        <HStack
          position={"absolute"}
          bottom={5}
          left={reverse ? "none" : 5}
          right={reverse ? 5 : "none"}
          fontSize={"3xl"}
        >
          {isLogin ? (
            <UpdatePopover thumbnailUrl={thumbnailUrl} id={link} />
          ) : (
            <Text
              onClick={onOpen}
              cursor={"pointer"}
              transition={"0.3s"}
              _hover={{
                color: twitterColor,
              }}
            >
              <BsThreeDots />
            </Text>
          )}
          {isLogin ? null : <LoginModal isOpen={isOpen} onClose={onClose} />}
        </HStack>
      </PostDiv>
    </>
  );
}
