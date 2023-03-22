import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";

interface IIntroduceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntroduceModal({
  isOpen,
  onClose,
}: IIntroduceModalProps) {
  return (
    <>
      <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>🛠️ 제작중! 🛠️</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack gap={3}>
              <Text>
                자기소개 페이지는 아직 제작중입니다. 금방 멋지게 만들게요!!
              </Text>
              <Image
                rounded={"3xl"}
                src="https://firebasestorage.googleapis.com/v0/b/ou9999-first-blog.appspot.com/o/icons%2Fthumbs_up.gif?alt=media&token=acc97150-574c-49c1-ab13-23daa87e646b"
              />
            </VStack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button colorScheme="twitter" onClick={onClose}>
              알겠어요!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
