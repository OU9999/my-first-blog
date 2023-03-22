import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEdit, FaLock } from "react-icons/fa";

interface IGBCommentPopoverProps {
  password: string;
  setIsEdit: any;
  isEdit: boolean;
}

export default function GBCommentPopover({
  password,
  setIsEdit,
  isEdit,
}: IGBCommentPopoverProps) {
  const { onClose, isOpen, onToggle } = useDisclosure();
  const [checkPassword, setCheckPassword] = useState("");
  const [wait, setWait] = useState(false);
  const toast = useToast();

  const onCheckButtonClicked = () => {
    if (password !== checkPassword) {
      toast({
        title: "비밀번호가 틀립니다",
        position: "top",
        isClosable: true,
        status: "error",
      });
    } else {
      setIsEdit(true);
      setCheckPassword("");
      onClose();
    }
  };

  useEffect(() => {
    if (isEdit === true) {
      setWait(true);
    } else {
      setWait(false);
    }
  }, [isEdit]);

  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement="top-end"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Box>
            <Tooltip label="수정" aria-label="edit" placement="top">
              <IconButton
                fontSize={"xl"}
                aria-label="editbutton"
                children={<FaEdit />}
                variant="ghost"
                onClick={onToggle}
                isDisabled={wait}
              />
            </Tooltip>
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">비밀번호 확인</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaLock color="gray.300" />}
              />
              <Input
                type="password"
                placeholder="비밀번호"
                variant="filled"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.currentTarget.value)}
              />
            </InputGroup>
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button colorScheme="twitter" variant={"ghost"} onClick={onClose}>
                취소
              </Button>
              <Button colorScheme="twitter" onClick={onCheckButtonClicked}>
                확인
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}
