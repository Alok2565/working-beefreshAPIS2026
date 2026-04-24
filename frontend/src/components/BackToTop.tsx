import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log("scroll:", window.scrollY); // debug
      setShow(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <Button
      onClick={scrollToTop}
      variant="warning"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        zIndex: 9999,
      }}
    >
      <FaArrowUp />
    </Button>
  );
}

export default BackToTop;