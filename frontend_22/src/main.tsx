// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <WishlistProvider>
//       <CartProvider>
//         <App />
//       </CartProvider>
//     </WishlistProvider>
//   </StrictMode>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

const rootElement = document.getElementById("root")!;

// Check if the root has already been initialized to avoid the warning
if (!window.reactRoot) {
  window.reactRoot = createRoot(rootElement);
}

window.reactRoot.render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </WishlistProvider>
  </StrictMode>,
);

// Add this to your global types or just use 'any' if in a rush
declare global {
  interface Window {
    reactRoot: any;
  }
}
