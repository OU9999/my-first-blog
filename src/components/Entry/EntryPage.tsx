import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  LightMode,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { GoThreeBars } from "react-icons/go";
import { useLocation, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLoginAtom } from "../../utils/atoms";
import { dbService } from "../../utils/firebase";
import { dateFormatter, selectBasicThumbnail } from "../../utils/utilsFn";
import DeleteModal from "../DeleteModal";
import EntryFooter from "./EntryFooter";

const BackGround = styled(motion.div)<{ bg: string | undefined }>`
  width: 100vw;
  height: 70vh;
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
  height: 70vh;
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

//custom style for md view
const CustomStyle = styled.div`
  blockquote {
    background-color: gray;
    border: none;
  }
`;

export interface IDetail {
  category: string;
  createdAt: number;
  md: string;
  thumbnailUrl: string;
  title: string;
}

export default function EntryPage() {
  const colorMode = useColorModeValue("light", "dark");
  const loc = useLocation();
  const [docId, setDocId] = useState(loc.pathname.slice(-20));
  const [detail, setDetail] = useState<IDetail>();
  const isLogin = useRecoilValue(isLoginAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const date = dateFormatter(detail?.createdAt!);

  const getDetail = async (id: string) => {
    const ref = doc(dbService, "notes", id);
    const snap = await getDoc(ref);
    const arr = snap.data();
    setDetail(arr as IDetail);
  };

  useEffect(() => {
    setDocId(loc.pathname.slice(-20));
    getDetail(docId);
  }, [docId, loc.pathname]);

  return (
    <>
      <BackGround bg={selectBasicThumbnail(detail?.category as string)} />
      <BackGroundCover />
      <Center
        minH={"70vh"}
        width="full"
        color="white"
        zIndex={2}
        position={"relative"}
      >
        <VStack gap={5}>
          <Heading textShadow={"#000 1px 0 10px"} fontSize={"5xl"} px={20}>
            {detail?.title}
          </Heading>
          <HStack gap={10}>
            <HStack justifyContent={"center"} alignItems={"center"} spacing={1}>
              <Box fontSize={"2xl"}>
                <GoThreeBars />
              </Box>
              <Text
                textShadow={"#000 1px 0 10px"}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {detail?.category}
              </Text>
            </HStack>
            <HStack justifyContent={"center"} alignItems={"center"} spacing={1}>
              <Box fontSize={"2xl"}>
                <BiTimeFive />
              </Box>
              <Text
                textShadow={"#000 1px 0 10px"}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {date}
              </Text>
            </HStack>
          </HStack>

          {isLogin ? (
            <HStack position={"absolute"} bottom={10} right={10}>
              <LightMode>
                <Link
                  to={{
                    pathname: `/write/${docId}`,
                  }}
                  state={{
                    title: detail?.title,
                    md: detail?.md,
                    thumbnailUrl: detail?.thumbnailUrl,
                    category: detail?.category,
                    docId: docId,
                  }}
                >
                  <Button
                    variant={"ghost"}
                    color={"white"}
                    colorScheme={"blackAlpha"}
                  >
                    수정
                  </Button>
                </Link>
              </LightMode>
              <LightMode>
                <Button
                  onClick={onOpen}
                  variant={"ghost"}
                  color={"white"}
                  colorScheme={"blackAlpha"}
                >
                  삭제
                </Button>
              </LightMode>
            </HStack>
          ) : null}
        </VStack>
      </Center>
      <Box py={"36"} width={"50%"} height="auto">
        {detail?.thumbnailUrl !== "" ? (
          <Image
            src={detail?.thumbnailUrl}
            rounded="3xl"
            h="full"
            w={"full"}
            transform={"auto"}
            boxShadow={"dark-lg"}
            border={"0px solid"}
            // _hover={{
            //   boxShadow: "dark-lg",
            //   translateY: -10,
            //   border: "3px solid",
            // }}
            translateY={0}
            transition={"0.3s"}
          />
        ) : null}
      </Box>
      <Box
        width={"75vw"}
        height="auto"
        bgColor={"red"}
        data-color-mode={colorMode}
      >
        <CustomStyle>
          <MDEditor.Markdown
            source={detail?.md}
            style={{
              backgroundColor: colorMode === "dark" ? "#1A202C" : undefined,
            }}
          />
        </CustomStyle>
      </Box>

      <EntryFooter category={detail?.category as string} docId={docId} />

      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        id={docId}
        thumbnailUrl={detail?.thumbnailUrl!}
      />
    </>
  );
}
