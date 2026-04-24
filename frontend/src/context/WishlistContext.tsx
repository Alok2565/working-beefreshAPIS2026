import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type WishlistContextType = {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
};

type Props = {
  children: ReactNode;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export const useWishlist = () => {

  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
};

export const WishlistProvider = ({ children }: Props) => {

  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {

    const exists = wishlistItems.find((item) => item.id === product.id);

    if (!exists) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};