import { VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import EntryPage from "../components/Entry/EntryPage";

export default function Entry() {
  return (
    <>
      <Helmet>
        <title>Entry - OU9999's Blog!</title>
      </Helmet>
      <VStack height={"auto"} width="100vw">
        <EntryPage />
      </VStack>
    </>
  );
}
