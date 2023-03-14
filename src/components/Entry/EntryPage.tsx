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
  VStack,
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLoginAtom } from "../../utils/atoms";
import { dbService, storageService } from "../../utils/firebase";
import { selectBasicThumbnail } from "../../utils/utilsFn";

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

/* 
custom style for md view 
const CustomStyle = styled.div``;
*/

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
  const docId = loc.pathname.slice(-20);
  const [detail, setDetail] = useState<IDetail>();
  const isLogin = useRecoilValue(isLoginAtom);

  const getDetail = async () => {
    const ref = doc(dbService, "notes", docId);
    const snap = await getDoc(ref);
    const arr = snap.data();
    setDetail(arr as IDetail);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("진짜 지울거야?");
    if (ok) {
      await deleteDoc(doc(dbService, "notes", docId));
      await deleteObject(ref(storageService, detail?.thumbnailUrl));
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

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
        <VStack gap={3}>
          <Heading textShadow={"#000 1px 0 10px"} fontSize={"5xl"}>
            {detail?.title}
          </Heading>
          <Text
            textShadow={"#000 1px 0 10px"}
            fontSize={"2xl"}
            fontWeight={"bold"}
          >
            {detail?.category}
          </Text>
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
                  onClick={onDeleteClick}
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
      <Box py={"36"}>
        <Image src={detail?.thumbnailUrl} rounded="3xl" />
      </Box>

      <Box
        width={"75vw"}
        height="auto"
        bgColor={"red"}
        data-color-mode={colorMode}
      >
        <MDEditor.Markdown
          source={detail?.md}
          style={{
            backgroundColor: colorMode === "dark" ? "#1A202C" : undefined,
          }}
        />
      </Box>
    </>
  );
}
