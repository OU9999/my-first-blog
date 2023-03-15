import { useEffect } from "react";
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
  }, []);

  return (
    <>
      <ScrollToTop />
      {isWrite ? null : <Header />}
      <Outlet />
      {isWrite ? null : <Footer />}
      <StartModal />
    </>
  );
}
