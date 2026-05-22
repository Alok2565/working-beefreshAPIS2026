// import React from "react";

// function Footer() {
//   return (
//     <div>
//       <h2>Copyright @ {new Date().getFullYear()}</h2>
//     </div>
//   );
// }

// export default Footer;
const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-2">
      <small>Copyright @ {new Date().getFullYear()} Admin Panel</small>
    </footer>
  );
};

export default Footer;
