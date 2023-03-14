import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { BsThreeDots } from "react-icons/bs";
import { dbService, storageService } from "../../utils/firebase";

interface IUpdatePopoverProps {
  id: string;
  thumbnailUrl: string;
}

export default function UpdatePopover({
  thumbnailUrl,
  id,
}: IUpdatePopoverProps) {
  const twitterColor = useColorModeValue("twitter.500", "twitter.200");

  const onDeleteClick = async () => {
    const ok = window.confirm("진짜 지울거야?");
    if (ok) {
      await deleteDoc(doc(dbService, "notes", id));
      await deleteObject(ref(storageService, thumbnailUrl));
    }
  };

  return (
    <>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Text
            onClick={() => console.log("hi")}
            cursor={"pointer"}
            transition={"0.3s"}
            _hover={{
              color: twitterColor,
            }}
          >
            <BsThreeDots />
          </Text>
        </PopoverTrigger>
        <Portal>
          <PopoverContent marginTop={6} boxShadow={"dark-lg"}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <HStack width={"full"} gap={3}>
                <Button
                  width={"50%"}
                  variant={"ghost"}
                  colorScheme={"twitter"}
                  fontSize={"xl"}
                >
                  수정
                </Button>
                <Button
                  width={"50%"}
                  colorScheme={"twitter"}
                  fontSize={"xl"}
                  onClick={onDeleteClick}
                >
                  삭제
                </Button>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}
