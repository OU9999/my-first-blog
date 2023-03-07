import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import StartModal from "./components/StartModal";
import { writeAtom } from "./utils/atoms";

export default function Root() {
  const isWrite = useRecoilValue(writeAtom);
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
