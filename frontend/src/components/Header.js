import { Navbar, Nav, Container, Badge, NavDropdown, Image } from "react-bootstrap";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice"
import SearchBox from "./SearchBox";
import { toast } from "react-toastify";

const Header = () => {
  // useSelector is used to select value from the state while useDispatch is used to dispatch or emit action
  const { cartItems } = useSelector((state) => state.cart);
  const { userinfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutCaller] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutCaller().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success("You are logged out");
    } catch(err) {
      console.log(err);
    }
  };
  // console.log(cartItems);
  return (
    <header className=" bg-black header position-fixed shadow-sm z-2" style={{width:"100%"}}>
      <Navbar  style={{backgroundColor: "black"}} variant="dark" expand="md" collapseOnSelect>
        <Container className=" py-2 px-3">
          <LinkContainer to="/" style={{ width:"100px", cursor:"pointer",color:"white"}}>
          <h2 style={{color:"white !important"}}>
            Proshop

            </h2>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls="basic-navbar"
            className=" border-0 toggle"
          ></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="ms-auto nav">
              <SearchBox />
              <LinkContainer to="/cart">
                <Nav.Link className=" text-white">
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="primary" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userinfo ? (
                <NavDropdown title={userinfo.name} id="username">
                  <LinkContainer to="/profile" className=" border-bottom shadow-sm fw-medium">
                    <NavDropdown.Item>
                      Profile <Image src={userinfo.profile} alt="profile Image" className=" shadow" style={{ width:"40px", height:"40px",position:"relative", top:"-2px", borderRadius:"100%"}}/>
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout <FaSignOutAlt />
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> SignIn
                  </Nav.Link>
                </LinkContainer>
              )}
              {userinfo && userinfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to={`/admin/orderlist`}>
                    <NavDropdown.Item>
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/admin/productlist`}>
                    <NavDropdown.Item>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/admin/userlist`}>
                    <NavDropdown.Item>
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    
  );
};

export default Header;
