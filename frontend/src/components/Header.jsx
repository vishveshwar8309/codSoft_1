import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser } from "react-icons/fa";
import { logOutUser } from "../slices/authSlice";
import { useLogOutUserMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogOutUserMutation();

  const handleProfileClick = async () => {
    navigate(`/user/${userInfo._id}`);
  };

  const handleLogOut = async () => {
    await logout();
    dispatch(logOutUser());
    navigate("/signin");
    toast.success("logout successfull");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbarBackground">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>BloggerBase</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <LinkContainer
                    to={`/user/${userInfo._id}/createblog`}
                    style={{ textDecoration: "none" }}
                    className="me-5"
                  >
                    <Nav.Link>Create a Blog</Nav.Link>
                  </LinkContainer>

                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={handleProfileClick}>
                      profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogOut}>
                      logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/signin">
                  <Nav.Link>
                    <FaUser />
                    signin
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
