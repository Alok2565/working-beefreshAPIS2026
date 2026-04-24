// import { Breadcrumb } from "react-bootstrap";
// import { Link, useLocation } from "react-router-dom";

// function Breadcrumbs() {
//   const location = useLocation();

//   const pathnames = location.pathname.split("/").filter((item) => item);

//   return (
//     <Breadcrumb>
//       <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
//         Home
//       </Breadcrumb.Item>
//       {pathnames.map((value, index) => {
//         const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
//         const isLast = index === pathnames.length - 1;

//         const label = value.charAt(0).toUpperCase() + value.slice(1);
//         return isLast ? (
//           <Breadcrumb.Item active key={routeTo}>
//             {label}
//           </Breadcrumb.Item>
//         ) : (
//           <Breadcrumb.Item linkAs={Link} linkProps={{ to: routeTo }} key={routeTo}>
//             {label}
//           </Breadcrumb.Item>
//         );
//       })}
//     </Breadcrumb>
//   );
// }

// export default Breadcrumbs;
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((item) => item);

  return (
    <Breadcrumb className="align-items-center">

      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/", className: "text-decoration-none text-dark fw-bold" }}>
        Home
      </Breadcrumb.Item>

      {pathnames.map((value, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        const label = value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <span key={routeTo} className="d-flex align-items-center">

              <MdKeyboardDoubleArrowRight className="text-dark mx-2 fw-bolder" size={25}/>

            {isLast ? (
              <Breadcrumb.Item active className="active-breadcrumb">
                {label}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: routeTo }}>
                {label}
              </Breadcrumb.Item>
            )}

          </span>
        );
      })}
    </Breadcrumb>
  );
}

export default Breadcrumbs;