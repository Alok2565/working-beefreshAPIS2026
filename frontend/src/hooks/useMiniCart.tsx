import { useState, useRef } from "react";

const useMiniCart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCart = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 150);
  };

  const closeCart = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return {
    isOpen,
    openCart,
    closeCart,
  };
};

export default useMiniCart;