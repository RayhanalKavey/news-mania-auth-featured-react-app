import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import LeftSideNav from "../LeftSideNav/LeftSideNav";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { FaUserAlt } from "react-icons/fa";
import { Image, NavLink } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Header = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const handleSignOut = () => {
    logout()
      .then((result) => {
        setUser({});
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Navbar
      className="mb-4"
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
    >
      <Container>
        <Navbar.Brand>
          <Link to={"/"}>News Mania</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">All news</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Categories</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="align-items-center">
            {/* notE show users email and photo */}

            {user?.uid ? (
              <>
                <span className="me-2">{user?.displayName}</span>
                <Button variant="light" onClick={handleSignOut}>
                  logout
                </Button>{" "}
              </>
            ) : (
              <>
                <Link variant="light" to="/login">
                  Login
                </Link>
                <Link to="/register">Register</Link>
              </>
            )}

            <Link to="/profile">
              {user?.photoURL ? (
                <Image
                  style={{ height: "40px" }}
                  roundedCircle
                  src={user.photoURL}
                ></Image>
              ) : (
                <FaUserAlt />
              )}
            </Link>
          </Nav>
          <div className="d-lg-none">
            <LeftSideNav></LeftSideNav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
