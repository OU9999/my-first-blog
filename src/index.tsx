import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import Router from "./routes/Router";
import theme from "./utils/theme";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initalColorMode} />
          <Router />
        </ChakraProvider>
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>
);
