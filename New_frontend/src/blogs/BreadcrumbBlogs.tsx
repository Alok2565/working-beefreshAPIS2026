// import { Breadcrumb } from "react-bootstrap";
// import { Link, useLocation } from "react-router-dom";
// import { blogData } from "./blogData";


// function BreadcrumbBlogs() {
//   const location = useLocation();
//   const pathnames = location.pathname.split("/").filter((item) => item);

//   return (
//     <Breadcrumb>
//       <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
//         Home
//       </Breadcrumb.Item>

//       {pathnames.map((value, index) => {
//         const to = "/" + pathnames.slice(0, index + 1).join("/");

//         let displayName = value;

//         // ✅ Replace ID with Blog Title
//         if (pathnames[0] === "blog" && index === 1) {
//           const blog = blogData.find(
//             (item) => item.id === Number(value)
//           );
//           displayName = blog ? blog.title : value;
//         }

//         return (
//           <Breadcrumb.Item
//             key={to}
//             linkAs={Link}
//             linkProps={{ to }}
//             active={index === pathnames.length - 1}
//           >
//             {displayName}
//           </Breadcrumb.Item>
//         );
//       })}
//     </Breadcrumb>
//   );
// }

// export default BreadcrumbBlogs;
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import {blogData} from "./blogData"; 

function BreadcrumbBlogs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((item) => item);

  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" ,className: "text-decoration-none text-dark fw-bold"}}>
        Home
      </Breadcrumb.Item>

      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");

        let displayName = value;
        if (pathnames[0] === "blog" && index === 1) {
          const blog = blogData.find(
            (item) => item.id === Number(value)
          );
          displayName = blog ? blog.title : value;
        }

        return (
          <span key={to} className="d-flex align-items-center">
            <MdKeyboardDoubleArrowRight className="text-dark mx-2 fw-bolder" size={25}/>
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to,className: "text-decoration-none text-warning fw-bold" }}
              active={index === pathnames.length - 1}
            >
              {displayName}
            </Breadcrumb.Item>
          </span>
        );
      })}
    </Breadcrumb>
  );
}

export default BreadcrumbBlogs;