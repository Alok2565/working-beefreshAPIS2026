import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import BackToTop from "./BackToTop";

function Layouts() {
  return (
    <>
      <Header />
      <main style={{ flex: 1, }}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default Layouts;