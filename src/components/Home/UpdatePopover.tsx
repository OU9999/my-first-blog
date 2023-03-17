import {
  Box,
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
  useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal";

interface IUpdatePopoverProps {
  id: string;
  thumbnailUrl: string;
  title: string;
  md: string;
  category: string;
}

export default function UpdatePopover({
  thumbnailUrl,
  id,
  title,
  md,
  category,
}: IUpdatePopoverProps) {
  const twitterColor = useColorModeValue("twitter.500", "twitter.200");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    onClose: onClosePopover,
    isOpen: isOpenPopover,
    onToggle: onTogglePopover,
  } = useDisclosure();

  return (
    <>
      <Popover
        placement="bottom-start"
        returnFocusOnClose={false}
        closeOnBlur={false}
        isOpen={isOpenPopover}
        onClose={onClosePopover}
      >
        <PopoverTrigger>
          <Text
            cursor={"pointer"}
            transition={"0.3s"}
            _hover={{
              color: twitterColor,
            }}
            onClick={onTogglePopover}
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
                <Box width={"50%"}>
                  <Link
                    to={{
                      pathname: `/write/${id}`,
                    }}
                    state={{
                      title: title,
                      md: md,
                      thumbnailUrl: thumbnailUrl,
                      category: category,
                      docId: id,
                    }}
                  >
                    <Button
                      width={"100%"}
                      variant={"ghost"}
                      colorScheme={"twitter"}
                      fontSize={"xl"}
                    >
                      수정
                    </Button>
                  </Link>
                </Box>

                <Button
                  width={"50%"}
                  colorScheme={"twitter"}
                  fontSize={"xl"}
                  onClick={onOpen}
                >
                  삭제
                </Button>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        id={id}
        thumbnailUrl={thumbnailUrl}
      />
    </>
  );
}
