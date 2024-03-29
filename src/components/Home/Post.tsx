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
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../utils/atoms";
import LoginModal from "../Header/LoginModal";
import UpdatePopover from "./UpdatePopover";
import { dateFormatter, selectBasicThumbnail } from "../../utils/utilsFn";
import { BiTimeFive } from "react-icons/bi";
import reset from "styled-reset";
import MDEditor from "@uiw/react-md-editor";

const PostDiv = styled(Box)`
  &:hover img {
    transform: scale(1.15);
  }
`;

const NoStyle = styled.div`
  ${reset}
  img,a,blockquote {
    display: none;
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
  const navigation = useNavigate();
  const twitterColor = useColorModeValue("twitter.500", "twitter.200");
  const colorMode = useColorModeValue("light", "dark");
  const mdBgColor = useColorModeValue(
    "rgba(255,255,255,1)",
    "rgba(45,55,72,1)"
  );
  const isLogin = useRecoilValue(isLoginAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const date = dateFormatter(createdAt);

  const onThumbnailClicked = () => {
    navigation(`/entry/${link}`);
  };

  return (
    <>
      <PostDiv
        position={"relative"}
        rounded="2xl"
        w="4xl"
        h="xs"
        overflow={"hidden"}
        boxShadow={"dark-lg"}
        bgColor={mdBgColor}
        transition={"0.3s"}
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
            width={"50%"}
            height={"100%"}
            alignItems={"flex-start"}
            p={10}
            gap={2}
            pl={8}
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
              <HStack
                spacing={1}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <BiTimeFive />
                <Text>{date}</Text>
              </HStack>
            </HStack>
            <Box position={"relative"} overflow="hidden">
              <Box
                width={"sm"}
                h={"24"}
                noOfLines={5}
                data-color-mode={colorMode}
                zIndex={1}
                overflow="hidden"
                wordBreak={"break-all"}
              >
                <NoStyle>
                  <MDEditor.Markdown
                    source={md}
                    style={{
                      backgroundColor: mdBgColor,
                      wordBreak: "break-all",
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
          </VStack>
          <VStack
            width={"50%"}
            height={"100%"}
            overflow={"hidden"}
            cursor={"pointer"}
            onClick={onThumbnailClicked}
            zIndex={5}
          >
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
            <UpdatePopover
              thumbnailUrl={thumbnailUrl}
              id={link}
              title={title}
              md={md}
              category={category}
            />
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
