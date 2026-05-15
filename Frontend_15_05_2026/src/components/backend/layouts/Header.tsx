import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Badge } from "react-bootstrap";
import { isAuthenticated, logout, getUser } from "../../../utils/auth";
import { FaUser, FaBell, FaKey } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

type Props = {
  toggleSidebar: () => void;
};

const Header: React.FC<Props> = ({ toggleSidebar }) => {
  const [theme, setTheme] = useState("light");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();
  const isLogin = isAuthenticated();
  const user = getUser();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Hover handlers with delay (IMPORTANT)
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // delay fixes flicker
  };

  const handleLogout = () => {
    logout();
    navigate("/user/login");
  };

  return (
    <header className="bg-dark text-white py-2 shadow-sm">
      <Container fluid>
        <Row className="align-items-center">
          {/* LEFT */}
          <Col xs={6} className="d-flex align-items-center gap-3">
            <Button variant="outline-light" size="sm" onClick={toggleSidebar}>
              ☰
            </Button>
            <h5 className="mb-0 fw-semibold">Admin Panel</h5>
          </Col>

          {/* RIGHT */}
          <Col
            xs={6}
            className="d-flex justify-content-end align-items-center gap-4"
          >
            {/* Notification */}
            <div className="position-relative cursor-pointer">
              <FaBell size={18} />
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: "10px" }}
              >
                3
              </Badge>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="warning"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? "🌙" : "☀"}
            </Button>

            {/* ✅ USER DROPDOWN */}
            <div
              className="position-relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Trigger */}
              <div className="d-flex align-items-center gap-2 cursor-pointer">
                <div
                  className="rounded-circle bg-light text-dark d-flex justify-content-center align-items-center"
                  style={{ width: "35px", height: "35px" }}
                >
                  <FaUser />
                </div>

                <span className="small">
                  Welcome, <strong>{user?.name || "User"}</strong>
                </span>
              </div>

              {/* Dropdown */}
              <div
                className={`dropdown-menu-custom position-absolute end-0 bg-white text-dark rounded shadow ${
                  showDropdown && isLogin ? "show" : ""
                }`}
                style={{
                  width: "275px",
                  zIndex: 999,
                  top: "100%", // attach directly below (NO GAP)
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-3 py-2 border-bottom">
                  <strong>{user?.email}</strong>
                </div>

                <Link
                  to="/admin/manage/profile"
                  className="dropdown-item p-1 px-2 hover-bg"
                >
                  <FaUser /> Profile
                </Link>

                <Link
                  to="/admin/manage/change-password"
                  className="dropdown-item p-1 px-2 hover-bg"
                >
                  <FaKey /> Change Password
                </Link>
                <div
                  className="dropdown-item text-danger border-top p-1 px-2"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  <IoMdLogOut /> Logout
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
