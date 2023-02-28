import {
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { startAnimationAtom } from "../utils/atoms";

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  transition: 0.5s;
`;

const StyledSpan = styled.span`
  transition: 0.5s;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  position: relative;
  font-size: 9rem;
  font-weight: bold;
  cursor: pointer;
  text-shadow: #fff 1px 0 10px;

  &:hover {
    scale: 1.1;
  }

  &:hover > i::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 2.5rem;
    background-color: #fff;
    box-shadow: 0 12rem #fff, 7.5rem 12rem #fff, 7.5rem 0 #fff;
  }
  &:hover > i::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2.5rem;
    height: 0.5rem;
    background-color: #fff;
    box-shadow: 0 14rem #fff, 5.5rem 14rem #fff, 5.5rem 0 #fff;
  }
`;

const Border = styled.i`
  position: absolute;
  inset: 0;
`;

export default function StartModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const setStartAnimation = useSetRecoilState(startAnimationAtom);

  useEffect(() => {
    onOpen();
    setStartAnimation(true);
    setTimeout(() => onClose(), 1500);
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        trapFocus={false}
        motionPreset={"scale"}
        isCentered
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent bg={"transparent"} border={"transparent"} shadow={"none"}>
          {/* _hover={{ filter: "auto", blur: "5px" }} */}
          <Center>
            <StyledDiv>
              <StyledSpan>
                <Border></Border>O
              </StyledSpan>
              <StyledSpan>
                <Border></Border>U
              </StyledSpan>
              <StyledSpan>
                <Border></Border>9
              </StyledSpan>
              <StyledSpan>
                <Border></Border>9
              </StyledSpan>
              <StyledSpan>
                <Border></Border>9
              </StyledSpan>
              <StyledSpan>
                <Border></Border>9
              </StyledSpan>
            </StyledDiv>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
}
