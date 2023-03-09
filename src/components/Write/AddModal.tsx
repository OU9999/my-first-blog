import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaImage } from "react-icons/fa";
import { dbService, storageService } from "../../utils/firebase";

interface IAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  bgColor: string;
  title: string;
  md: string;
}

export default function AddModal({
  isOpen,
  onClose,
  bgColor,
  title,
  md,
}: IAddModalProps) {
  const [thumbnail, setThumbnail] = useState<string | undefined>();
  const twitterColor = useColorModeValue("twitter.500", "twitter.200");
  const thumbnailInput = useRef<HTMLInputElement>(null);
  const [newCategory, setNewCategory] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const toast = useToast();

  const onThumbnailButtonClicked = (e: any) => {
    thumbnailInput?.current?.click();
  };

  const onClearThumbnailButtonClicked = (e: any) => {
    setThumbnail(undefined);
  };

  const onFileChange = ({
    currentTarget: { files },
  }: React.FormEvent<HTMLInputElement>) => {
    if (files) {
      const uploadFile = files![0];
      const reader = new FileReader();
      reader.onloadend = (finishEvent) => {
        setThumbnail(finishEvent.target?.result as string);
      };
      reader.readAsDataURL(uploadFile);
    }
  };

  const onAddButtonClick = async () => {
    if (selectedCategory === undefined || selectedCategory === "") {
      toast({
        title: "카테고리를 설정해주세요!",
        position: "top",
        isClosable: true,
        status: "error",
      });
      return;
    }
    const thumbnailRef = ref(storageService, `notes/${uuidv4()}`);
    let getThumbnailUrl = "";
    if (thumbnail) {
      const response = await uploadString(
        thumbnailRef,
        thumbnail as string,
        "data_url"
      );
      getThumbnailUrl = await getDownloadURL(response.ref);
    }
    await addDoc(collection(dbService, "notes"), {
      md: md,
      title: title,
      category: selectedCategory,
      createdAt: Date.now(),
      thumbnailUrl: getThumbnailUrl,
    });
    setThumbnail(undefined);
    setSelectedCategory(undefined);
    onClose();
    toast({
      title: "노트작성 완료!",
      position: "top",
      isClosable: true,
    });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>노트 미리보기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack width={"full"}>
              {thumbnail && (
                <>
                  <HStack width={"full"} justifyContent={"flex-end"}>
                    <Box>
                      <Link
                        color={twitterColor}
                        onClick={onThumbnailButtonClicked}
                      >
                        재업로드
                      </Link>
                      <input
                        type="file"
                        onChange={onFileChange}
                        accept="image/*"
                        ref={thumbnailInput}
                        style={{ display: "none" }}
                      />
                    </Box>
                    <Link
                      color={twitterColor}
                      onClick={onClearThumbnailButtonClicked}
                    >
                      제거
                    </Link>
                  </HStack>
                </>
              )}

              <Flex
                flexDir={"column"}
                width="full"
                height={"48"}
                bgColor={bgColor}
                justifyContent="center"
                alignItems={"center"}
                gap={3}
                bgImage={thumbnail ? thumbnail : undefined}
                bgSize={"cover"}
              >
                {!thumbnail ? (
                  <>
                    <Box fontSize={"5xl"}>
                      <FaImage />
                    </Box>
                    <Box>
                      <Button
                        colorScheme={"twitter"}
                        onClick={onThumbnailButtonClicked}
                      >
                        썸네일 업로드
                      </Button>
                      <input
                        type="file"
                        onChange={onFileChange}
                        accept="image/*"
                        ref={thumbnailInput}
                        style={{ display: "none" }}
                      />
                    </Box>
                  </>
                ) : undefined}
              </Flex>
              <Text width={"full"} fontWeight="bold" fontSize={"2xl"}>
                {title}
              </Text>
              <Text
                width={"full"}
                border="1px solid"
                noOfLines={4}
                bgColor={bgColor}
                px={4}
                py={2}
                rounded="lg"
              >
                {md}
              </Text>
              <Divider />
            </VStack>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    카테고리 선택
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack>
                    <HStack width={"full"}>
                      <InputGroup>
                        <Input
                          placeholder="새 카테고리 추가"
                          variant={"filled"}
                          type={"email"}
                          value={newCategory}
                          onChange={(e) =>
                            setNewCategory(e.currentTarget.value)
                          }
                        />
                      </InputGroup>
                      <IconButton icon={<BiPlus />} aria-label="add" />
                    </HStack>
                    <Select
                      placeholder="카테고리를 선택해주세요!"
                      onChange={(e) =>
                        setSelectedCategory(e.currentTarget.value)
                      }
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="twitter"
              mr={3}
              onClick={onClose}
              variant="ghost"
            >
              취소
            </Button>
            <Button colorScheme="twitter" onClick={onAddButtonClick}>
              노트작성
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
