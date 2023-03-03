import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import StartModal from "./components/StartModal";

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <StartModal />
    </>
  );
}
