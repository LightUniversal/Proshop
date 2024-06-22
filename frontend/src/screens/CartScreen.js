import React from "react";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import { FaCartArrowDown, FaShoppingCart, FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   get cart state
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id))
        console.log("Working...");
  }
  const addToCartHandler = async (item, qty) => {
        dispatch(addToCart({
          ...item, qty
        }))
  }
  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping")
  }
  return (
    <Row>
      <Col md={8}>
        <h2 style={{ marginBottom: "0px", fontSize: "20px" }} className=" p-2 m-2 border-bottom mb-0 ">Shopping Cart <FaShoppingCart className=" mb-1  " /> Details</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => 
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link style={{ textDecoration: "none", fontWeight:"600"}} to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    <p style={{ textDecoration: "none", fontWeight:"600"}} className="text-white bg-success  text-center px-1 py-2 rounded-1 shadow-sm ">&#x20A6;{item.price}</p>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {addToCartHandler(item, Number(e.target.value))}}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                      {/* The keys is used to create arrays of indexes */}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" className=" rounded-circle " onClick={() => {removeFromCartHandler(item._id)} }>
                      <FaTrash className="text-danger" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((a, i) => a + i.qty, 0)})</h2>&#x20A6;
              {cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              ><FaCartArrowDown /> Proceed To Checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
