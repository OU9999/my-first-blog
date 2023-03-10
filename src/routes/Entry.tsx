import { VStack } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

const md = `
# hello?

**test**

normal
`;

export default function Entry() {
  return (
    <VStack height={"100vh"} width="100vw">
      <ReactMarkdown>{md}</ReactMarkdown>
    </VStack>
  );
}
