import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { dbService, storageService } from "../utils/firebase";

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  thumbnailUrl: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  id,
  thumbnailUrl,
}: ILoginModalProps) {
  const toast = useToast();
  const navigation = useNavigate();

  const onDeleteClick = async () => {
    await deleteDoc(doc(dbService, "notes", id));
    if (thumbnailUrl !== "") {
      await deleteObject(ref(storageService, thumbnailUrl));
    }
    toast({
      title: "삭제 완료!",
      position: "top",
      isClosable: true,
    });
    onClose();
    navigation(-1);
  };

  return (
    <>
      <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>노트 삭제</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>정말로 삭제하시겠습니까?</ModalBody>
          <ModalFooter gap={3}>
            <Button colorScheme="twitter" onClick={onClose} variant="ghost">
              취소
            </Button>
            <Button colorScheme="twitter" mr={3} onClick={onDeleteClick}>
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
