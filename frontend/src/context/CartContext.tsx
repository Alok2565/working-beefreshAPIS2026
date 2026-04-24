import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";

/* Product Type (clean product data) */
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

/* Cart Item Type */
export type CartItem = Product & {
  qty: number;
};

/* Context Type */
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeItem: (id: number) => void;
  removeFromCart:(id:number)=>void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
};

/* Provider Props */
type CartProviderProps = {
  children: ReactNode;
};

/* Create Context */
export const CartContext = createContext<CartContextType | null>(null);

/* Custom Hook */
export const useCart = () => {

  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};

/* Provider */
export const CartProvider = ({ children }: CartProviderProps) => {

  /* Load cart from localStorage */
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  /* Save cart */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* Add to cart */
  const addToCart = (product: Product) => {

    const existing = cartItems.find((item) => item.id === product.id);

    if (existing) {

      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );

    } else {

      setCartItems([
        ...cartItems,
        { ...product, qty: 1 }
      ]);

    }

  };

  /* Remove item */
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

   const removeFromCart = (id:number) => {
  setCartItems((prev) => prev.filter((item) => item.id !== id));
};

  /* Increase quantity */
  const increaseQty = (id: number) => {

    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );

  };

  /* Decrease quantity */
  const decreaseQty = (id: number) => {

    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );

  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        removeFromCart,
        increaseQty,
        decreaseQty
      }}
    >
      {children}
    </CartContext.Provider>
  );
};