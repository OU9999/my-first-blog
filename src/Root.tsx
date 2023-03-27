import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import StartModal from "./components/StartModal";
import { isLoginAtom, writeAtom } from "./utils/atoms";
import { authService } from "./utils/firebase";

export default function Root() {
  const isWrite = useRecoilValue(writeAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>OU9999's Blog!</title>
      </Helmet>
      <ScrollToTop />

      {isWrite ? null : <Header />}
      <Outlet />
      {isWrite ? null : <Footer />}

      <StartModal />
    </>
  );
}
